import { CSpinner } from '@coreui/react';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import * as React from 'react';
import toast, { Toaster } from "react-hot-toast";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import Modal from './Modal';
import Add from './Add';
import AuthHOC from '../Hoc/UserAuth';
import ReviewsIcon from '@mui/icons-material/Reviews';
import ReviewModal from './Reviews';

function BasicTable() {
    const [bikes, setBikes] = React.useState([]);
    const [EditBike, setEditBike] = React.useState(null);
    const [deleteBikeState, setDeleteBike] = React.useState(null);
    const [newPart, setNewPart] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [delLoading, setDelLoading] = React.useState(false);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [postsPerPage] = React.useState(5);
    const [review, setReview] = React.useState(null);

    React.useEffect(() => {
        getAllBikes();
    }, [])

    const getAllBikes = () => {
        setLoading(true);
        fetch(`https://bikechahiye.onrender.com/api/spareParts`,
            { method: 'GET' },
        )
            .then(res => res.json())
            .then(data => {
                setLoading(false);
                setBikes(data?.Products);
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
        const { data } = await axios.post('https://bikechahiye.onrender.com/api/product/delete', { _id: deleteBikeState?._id });
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
        const { data } = await axios.post('https://bikechahiye.onrender.com/api/spareParts/updateParts', {
            partID: EditBike?._id,
            featuredPart: EditBike?.featuredProduct ? false : true
        });
        if (data?._id) {
            setDelLoading(false);
            toast.success('Update Successfully')
            const _map = bikes?.map(item => {
                if (item?._id === data?._id) {
                    item.featuredProduct = data?.featuredProduct;
                }
                return item;
            });
            setBikes(_map);
            setEditBike(null);
        }
    };

    return <>
        <div style={{
            display: 'flex',
            justifyContent: 'space-between'
        }}>
            <h3>Spare Parts List</h3>
            <Button style={{ backgroundColor: '#dc3545' }} onClick={() => setNewPart(true)} variant="contained">Add Spare Part</Button>
        </div>
        <Toaster
            position="top-right"
            reverseOrder={false}
        />
         <ReviewModal review={review} setReview={setReview} />
        <Modal
            EditBike={EditBike}
            deleteBikeState={deleteBikeState}
            setEditBike={setEditBike}
            setDeleteBike={setDeleteBike}
            changeFeatured={changeFeatured}
            deleteBike={deleteBike}
            delLoading={delLoading}
        />
        <Add
            newPart={newPart}
            setNewPart={setNewPart}
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
                                    <TableCell align='center' style={{ fontWeight: 'bold' }}>Name</TableCell>
                                    <TableCell align='center' style={{ fontWeight: 'bold' }}>Brand</TableCell>
                                    <TableCell align='center' style={{ fontWeight: 'bold' }}>Category</TableCell>
                                    <TableCell align='center' style={{ fontWeight: 'bold' }}>Price</TableCell>
                                    <TableCell align='center' style={{ fontWeight: 'bold' }}>Featured</TableCell>
                                    <TableCell align='center' style={{ fontWeight: 'bold' }}>Type</TableCell>
                                    <TableCell align='center' style={{ fontWeight: 'bold' }}>Action</TableCell>
                                    <TableCell align='center' style={{ fontWeight: 'bold' }}>Reviews</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {_filter?.map((row) => (
                                    <TableRow
                                        key={row._id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align='center' component="th" scope="row">
                                            <img src={`https://bikechahiye.onrender.com/${row?.partPic[0]}`}
                                                style={{ width: '50px', height: '40px' }}
                                                alt='image'
                                            />
                                        </TableCell>
                                        <TableCell align='center'>{row?.name}</TableCell>
                                        <TableCell align='center'>{row?.brand}</TableCell>
                                        <TableCell align='center'>{row?.category}</TableCell>
                                        <TableCell align='center'>{row?.price}</TableCell>
                                        <TableCell align='center'>{row?.featuredParts ? 'True' : 'False'}</TableCell>
                                        <TableCell align='center'>{row?.types}</TableCell>
                                        <TableCell align='center'>
                                            <div>
                                                <AiFillDelete onClick={() => setDeleteBike(row)} style={{ fontSize: '20px', color: 'red' }} />
                                                <AiFillEdit onClick={() => setEditBike(row)} style={{ fontSize: '20px', color: 'green' }} />
                                            </div>
                                        </TableCell>
                                        <TableCell align='center'>
                                            <ReviewsIcon onClick={() => setReview(row)} style={{ fontSize: '20px', color: '#1976d2' }} />
                                            {` (${row?.pRatingsReviews?.length})`}
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