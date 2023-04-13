import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { AiFillDelete, AiFillEdit, AiFillEye } from "react-icons/ai";
import Pagination from '@mui/material/Pagination';
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";
import Modal from './Modal';
import { CSpinner } from '@coreui/react';
import AuthHOC from '../Hoc/UserAuth';
import OwnerModel from './Owner';

function BasicTable() {
    const [bikes, setBikes] = React.useState([]);
    const [EditBike, setEditBike] = React.useState(null);
    const [deleteBikeState, setDeleteBike] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [ownerDetail, setOwnerDetail] = React.useState(null);
    const [delLoading, setDelLoading] = React.useState(false);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [postsPerPage] = React.useState(5);

    React.useEffect(() => {
        getAllBikes();
    }, [])

    const getAllBikes = () => {
        setLoading(true);
        fetch(`https://bikechahiye.onrender.com/api/usedBike/getAllUsedBike`,
            { method: 'GET' },
        )
            .then(res => res.json())
            .then(data => {
                setLoading(false);
                setBikes(data);
            })
    }

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const _filter = bikes?.slice(indexOfFirstPost, indexOfLastPost);

    const handleChange = (event, value) => {
        setCurrentPage(value);
    };

    const deleteBike = async () => {
        setDelLoading(true);
        const { data } = await axios.post('https://bikechahiye.onrender.com/api/usedBike/delete', { _id: deleteBikeState?._id });
        if (data?._id) {
            setDelLoading(false);
            toast.success('Bike delete successfully');
            const delItem = bikes?.filter(item => item?._id !== data?._id);
            setBikes(delItem);
            setDeleteBike(null);
        }
    }

    const changeFeatured = async () => {
        setDelLoading(true);
        const { data } = await axios.post('https://bikechahiye.onrender.com/api/usedBike/update', {
            useBikeID: EditBike?._id,
            featuredUsedBike: EditBike?.featuredUsedBike ? false : true
        });
        if (data?._id) {
            setDelLoading(false);
            toast.success('Update Successfully')
            const _map = bikes?.map(item => {
                if (item?._id === data?._id) {
                    item.featuredUsedBike = data?.featuredUsedBike;
                }
                return item;
            });
            setBikes(_map);
            setEditBike(null);
        }
    };

    return <>
        <div>
            <h3>Used Bikes List</h3>
        </div>
        <Toaster
            position="top-right"
            reverseOrder={false}
        />
        <Modal
            EditBike={EditBike}
            deleteBikeState={deleteBikeState}
            setEditBike={setEditBike}
            setDeleteBike={setDeleteBike}
            changeFeatured={changeFeatured}
            deleteBike={deleteBike}
            delLoading={delLoading}
        />
        <OwnerModel
            ownerDetail={ownerDetail}
            setOwnerDetail={setOwnerDetail}
        />
        {
            loading ?
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                    <CSpinner />
                </div>
                :
                <>
                    <TableContainer sx={{ marginTop: '2rem' }} component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align='center' style={{ fontWeight: 'bold' }}>Image</TableCell>
                                    <TableCell align='center' style={{ fontWeight: 'bold' }}>Bike No.</TableCell>
                                    <TableCell align='center' style={{ fontWeight: 'bold' }}>Brand</TableCell>
                                    <TableCell align='center' style={{ fontWeight: 'bold' }}>Category</TableCell>
                                    <TableCell align='center' style={{ fontWeight: 'bold' }}>Model</TableCell>
                                    <TableCell align='center' style={{ fontWeight: 'bold' }}>City</TableCell>
                                    <TableCell align='center' style={{ fontWeight: 'bold' }}>Price</TableCell>
                                    <TableCell align='center' style={{ fontWeight: 'bold' }}>Featured</TableCell>
                                    <TableCell align='center' style={{ fontWeight: 'bold' }}>Owner Detail</TableCell>
                                    <TableCell align='center' style={{ fontWeight: 'bold' }}>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {_filter?.map((row) => (
                                    <TableRow
                                        key={row._id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align='center' component="th" scope="row">
                                            <img src={`https://bikechahiye.onrender.com/${row?.usedBikePic[0]}`}
                                                style={{ width: '50px' }}
                                                alt='image'
                                            />
                                        </TableCell>
                                        <TableCell align='center'>{row?.bikeNumber}</TableCell>
                                        <TableCell align='center'>{row?.brand}</TableCell>
                                        <TableCell align='center'>{row?.category[0]}</TableCell>
                                        <TableCell align='center'>{row?.regYear}</TableCell>
                                        <TableCell align='center'>{row?.city}</TableCell>
                                        <TableCell align='center'>{row?.finalPrice}</TableCell>
                                        <TableCell align='center'>{row?.featuredUsedBike ? 'True' : 'False'}</TableCell>
                                        <TableCell align='center'>
                                            <AiFillEye onClick={() => setOwnerDetail(row?.userID)} style={{ fontSize: '20px', color: '#1976d2' }} />
                                        </TableCell>
                                        <TableCell align='center'>
                                            <div>
                                                <AiFillDelete onClick={() => setDeleteBike(row)} style={{ fontSize: '20px', color: 'red' }} />
                                                <AiFillEdit onClick={() => setEditBike(row)} style={{ fontSize: '20px', color: 'green' }} />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        <Pagination
                            count={Math.ceil(bikes?.length / postsPerPage)}
                            onChange={handleChange}
                            color="error"
                        />
                    </div>
                </>
        }
    </>
}

export default AuthHOC(BasicTable);