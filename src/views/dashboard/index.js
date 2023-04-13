import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { AiFillDelete } from "react-icons/ai";
import Pagination from '@mui/material/Pagination';
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";
import Modal from './Modal';
import moment from 'moment';
import { AiOutlineUser } from 'react-icons/ai';
import { CSpinner } from '@coreui/react';
import AuthHOC from '../Hoc/UserAuth';

function BasicTable() {
    const [Users, setUsers] = React.useState([]);
    const [deleteUser, setDeleteUser] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [delLoading, setDelLoading] = React.useState(false);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [postsPerPage] = React.useState(5);

    React.useEffect(() => {
        getAllUser();
    }, [])

    const getAllUser = () => {
        setLoading(true);
        fetch(`https://bikechahiye.onrender.com/api/user/getAll`,
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

    const deleteUserFn = async () => {
        setDelLoading(true);
        const { data } = await axios.post('https://bikechahiye.onrender.com/api/user/delete', { _id: deleteUser?._id });
        if (data?.msg) {
            setDelLoading(false);
            toast.success('User delete successfully');
            const delItem = Users?.filter(item => item?._id !== deleteUser?._id);
            setUsers(delItem);
            setDeleteUser(null);
        }
    }

    return <>
        <div>
            <h3>Registered Users</h3>
        </div>
        <Toaster
            position="top-right"
            reverseOrder={false}
        />
        <Modal
            deleteUser={deleteUser}
            setDeleteUser={setDeleteUser}
            deleteUserFn={deleteUserFn}
            delLoading={delLoading}
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
                                    <TableCell align='center' style={{ fontWeight: 'bold' }}>Email</TableCell>
                                    <TableCell align='center' style={{ fontWeight: 'bold' }}>Phone</TableCell>
                                    <TableCell align='center' style={{ fontWeight: 'bold' }}>Role</TableCell>
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
                                                row?.profileImg ?
                                                    <img src={`https://bikechahiye.onrender.com/${row?.profileImg}`}
                                                        style={{ width: '50px' }}
                                                        alt='image'
                                                    />
                                                    :
                                                    <AiOutlineUser style={{ fontSize: '20px' }} />
                                            }
                                        </TableCell>
                                        <TableCell align='center'>{row?.name}</TableCell>
                                        <TableCell align='center'>{row?.email}</TableCell>
                                        <TableCell align='center'>{row?.phone}</TableCell>
                                        <TableCell align='center'>{row?.role}</TableCell>
                                        <TableCell align='center'>{moment(row?.createdAt).format('ll')}</TableCell>
                                        <TableCell align='center'>
                                            <AiFillDelete onClick={() => setDeleteUser(row)} style={{ fontSize: '20px', color: 'red' }} />
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