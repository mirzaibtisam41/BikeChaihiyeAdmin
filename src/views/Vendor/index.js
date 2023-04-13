import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";
import Modal from './Modal';
import moment from 'moment';
import { AiFillEdit, AiFillEye } from 'react-icons/ai';
import { CSpinner } from '@coreui/react';
import { useHistory } from 'react-router-dom';
import AuthHOC from '../Hoc/UserAuth';
import { Button } from '@mui/material';
import Add from './Add';

function BasicTable() {
    const history = useHistory();
    const [Users, setUsers] = React.useState([]);
    const [EditVendor, setEditVendor] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [newPart, setNewPart] = React.useState(false);
    const [delLoading, setDelLoading] = React.useState(false);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [postsPerPage] = React.useState(5);

    React.useEffect(() => {
        getAllUser();
    }, [])

    const getAllUser = () => {
        setLoading(true);
        fetch(`https://bikechahiye.onrender.com/api/vendor/getAll`,
            { method: 'GET' },
        )
            .then(res => res.json())
            .then(data => {
                if (!data.message) {
                    setLoading(false);
                    setUsers(data);
                }
            })
    }

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const _filter = Users?.slice(indexOfFirstPost, indexOfLastPost);

    const handleChange = (event, value) => {
        setCurrentPage(value);
    };

    const EditVendorFn = async () => {
        setDelLoading(true);
        const { data } = await axios.post('https://bikechahiye.onrender.com/api/vendor/update',
            {
                vendorID: EditVendor?._id,
                featuredVendor: EditVendor?.featuredVendor ? false : true
            }
        );
        if (data?._id) {
            setDelLoading(false);
            toast.success('Update successfully');
            const _map = Users?.map(item => {
                if (item?._id === data?._id) {
                    item.featuredVendor = data?.featuredVendor;
                }
                return item;
            });
            setUsers(_map);
            setEditVendor(null);
        }
    }

    return <>
        <div style={{
            display: 'flex',
            justifyContent: 'space-between'
        }}>
            <h3>Vendors List</h3>
            <Button style={{ backgroundColor: '#dc3545' }} onClick={() => setNewPart(true)} variant="contained">Add Vendor</Button>
        </div>
        <Toaster
            position="top-right"
            reverseOrder={false}
        />
        <Modal
            EditVendor={EditVendor}
            setEditVendor={setEditVendor}
            EditVendorFn={EditVendorFn}
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
                                    <TableCell align='center' style={{ fontWeight: 'bold' }}>Shop Name</TableCell>
                                    <TableCell align='center' style={{ fontWeight: 'bold' }}>Phone</TableCell>
                                    <TableCell align='center' style={{ fontWeight: 'bold' }}>CNIC</TableCell>
                                    <TableCell align='center' style={{ fontWeight: 'bold' }}>Featured</TableCell>
                                    <TableCell align='center' style={{ fontWeight: 'bold' }}>Registered On</TableCell>
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
                                            {
                                                row?.image ?
                                                    <img src={`https://bikechahiye.onrender.com/${row?.image}`}
                                                        style={{ width: '50px' }}
                                                        alt='image'
                                                    />
                                                    :
                                                    <AiOutlineUser style={{ fontSize: '20px' }} />
                                            }
                                        </TableCell>
                                        <TableCell align='center'>{row?.name}</TableCell>
                                        <TableCell align='center'>{row?.shopName}</TableCell>
                                        <TableCell align='center'>{row?.phone}</TableCell>
                                        <TableCell align='center'>{row?.cnic}</TableCell>
                                        <TableCell align='center'>{row?.featuredVendor ? 'True' : 'False'}</TableCell>
                                        <TableCell align='center'>{moment(row?.createdAt).format('ll')}</TableCell>
                                        <TableCell align='center'>
                                            <AiFillEdit onClick={() => setEditVendor(row)} style={{ fontSize: '20px', color: 'red' }} />
                                            <AiFillEye onClick={() => history.push(`/vendorProducts/${row?._id}`)} style={{ fontSize: '20px', color: '#1976d2' }} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        <Pagination
                            count={Math.ceil(Users?.length / postsPerPage)}
                            onChange={handleChange}
                            color="error"
                        />
                    </div>
                </>
        }
    </>
}

export default AuthHOC(BasicTable);