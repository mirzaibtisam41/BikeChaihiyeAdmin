import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import * as React from 'react';
import Card from './card';
import Pagination from '@mui/material/Pagination';
import { CSpinner } from '@coreui/react';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function BasicGrid() {
    const [products, setProducts] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [postsPerPage] = React.useState(6);

    React.useEffect(() => {
        const id = window.location.pathname.split('/')[2];
        getVendorProducts(id);
    }, []);

    const getVendorProducts = async (id) => {
        setLoading(true);
        const { data } = await axios.post('https://bikechahiye.onrender.com/api/product/getByOwner', { owner: id });
        if (data) {
            setLoading(false);
            setProducts(data);
        }
    }

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const _filter = products?.slice(indexOfFirstPost, indexOfLastPost);

    const handleChange = (event, value) => {
        setCurrentPage(value);
    };

    return <>
        <h3>Products List</h3>
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
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr 1fr',
                        gridGap: '15px',
                        marginTop: '25px'
                    }}>
                        {
                            _filter?.map((product) => {
                                return <Card key={product?._id} item={product} />
                            })
                        }
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '20px' }}>
                        <Pagination
                            count={Math.ceil(products?.length / postsPerPage)}
                            onChange={handleChange}
                            color="error"
                        />
                    </div>
                </>
        }
    </>
}