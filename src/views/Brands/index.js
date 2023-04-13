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
import * as React from 'react';
import toast, { Toaster } from "react-hot-toast";
import { AiFillDelete, AiFillEye } from "react-icons/ai";
import Add from './AddBrand';
import Modal from './DelModal';
import Power from './AddPower';
import axios from 'axios';
import AuthHOC from '../Hoc/UserAuth';

function BasicTable() {
    const [Brands, setBrands] = React.useState([]);
    const [deleteBikeState, setDeleteBike] = React.useState(null);
    const [NewBrand, setNewBrand] = React.useState(false);
    const [Category, setCategory] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [delLoading, setDelLoading] = React.useState(false);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [postsPerPage] = React.useState(5);

    React.useEffect(() => {
        getAllBrands();
    }, [])

    const getAllBrands = () => {
        setLoading(true);
        fetch(`https://bikechahiye.onrender.com/api/category`,
            { method: 'GET' },
        )
            .then(res => res.json())
            .then(data => {
                setLoading(false);
                setBrands(data);
            })
    }

    const deleteBrand = async () => {
        setDelLoading(true);
        const { data } = await axios.post('https://bikechahiye.onrender.com/api/category/deleteBrand', { _id: deleteBikeState?._id });
        if (data?._id) {
            setDelLoading(false);
            toast.success('Brand deleted successfully');
            const delItem = Brands?.filter(item => item?._id !== data?._id);
            setBrands(delItem);
            setDeleteBike(null);
        }
    }

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const _filter = Brands?.slice(indexOfFirstPost, indexOfLastPost);

    const handleChange = (event, value) => {
        setCurrentPage(value);
    };

    return <>
        <div style={{
            display: 'flex',
            justifyContent: 'space-between'
        }}>
            <h3>Added Brands List</h3>
            <Button style={{ backgroundColor: '#dc3545' }} onClick={() => setNewBrand(true)} variant="contained">Add Brand</Button>
        </div>
        <Toaster
            position="top-right"
            reverseOrder={false}
        />
        <Modal
            deleteBikeState={deleteBikeState}
            setDeleteBike={setDeleteBike}
            delLoading={delLoading}
            deleteBrand={deleteBrand}
        />
        <Add
            NewBrand={NewBrand}
            setNewBrand={setNewBrand}
            setBrands={setBrands}
            Brands={Brands}
        />
        <Power
            Category={Category}
            setCategory={setCategory}
            Brands={Brands}
            setBrands={setBrands}
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
                                    <TableCell align='center' style={{ fontWeight: 'bold' }}>Brand</TableCell>
                                    <TableCell align='center' style={{ fontWeight: 'bold' }}>Powers</TableCell>
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
                                            <img src={`https://bikechahiye.onrender.com/${row?.brandPic}`}
                                                style={{ width: '50px', height: '40px' }}
                                                alt='image'
                                            />
                                        </TableCell>
                                        <TableCell align='center'>{row?.brand}</TableCell>
                                        <TableCell align='center'>
                                            <AiFillEye onClick={() => setCategory(row)} style={{ fontSize: '20px', color: '#1976d2' }} />
                                        </TableCell>
                                        <TableCell align='center'>
                                            <div>
                                                <AiFillDelete onClick={() => setDeleteBike(row)} style={{ fontSize: '20px', color: 'red' }} />
                                                {/* <AiFillEdit onClick={() => setEditBike(row)} style={{ fontSize: '20px' }} /> */}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        <Pagination
                            count={Math.ceil(Brands?.length / postsPerPage)}
                            onChange={handleChange}
                            color="error"
                        />
                    </div>
                </>
        }
    </>
}

export default AuthHOC(BasicTable);