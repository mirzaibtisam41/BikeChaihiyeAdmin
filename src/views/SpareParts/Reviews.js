import CloseIcon from '@mui/icons-material/Close';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Slide from '@mui/material/Slide';
import Switch from '@mui/material/Switch';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { AiFillDelete } from "react-icons/ai";
import ReactStars from "react-rating-stars-component";
import ConfirmationDialoge from './ConfirmationDialoge';
import DeleteDialoge from './DeleteDialoge';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    '& .MuiSwitch-track': {
        borderRadius: 22 / 2,
        '&:before, &:after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 16,
            height: 16,
        },
        '&:before': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                theme.palette.getContrastText(theme.palette.primary.main),
            )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
            left: 12,
        },
        '&:after': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                theme.palette.getContrastText(theme.palette.primary.main),
            )}" d="M19,13H5V11H19V13Z" /></svg>')`,
            right: 12,
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: 'none',
        width: 16,
        height: 16,
        margin: 2,
    },
}));

export default function FullScreenDialog({ review, setReview }) {

    const [updateProductReview, setUpdateProductReview] = React.useState(null);
    const [deleteProductReview, setDeleteProductReview] = React.useState(null);

    const handleClose = () => {
        setReview(null);
    };

    return (
        <div>
            <Dialog
                fullScreen
                open={review ? true : false}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <ConfirmationDialoge
                    updateProductReview={updateProductReview}
                    setUpdateProductReview={setUpdateProductReview}
                    review={review}
                    setReview={setReview}
                />
                <DeleteDialoge
                    deleteProductReview={deleteProductReview}
                    setDeleteProductReview={setDeleteProductReview}
                    review={review}
                />
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            {`Reviews (${review?.pRatingsReviews?.length})`}
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            Close
                        </Button>
                    </Toolbar>
                </AppBar>
                <List>
                    {
                        review?.pRatingsReviews?.map((item, index) => {
                            return <div className='px-4 mt-3' key={index}>
                                <section className='d-flex justify-content-between align-items-center'>
                                    <div>
                                        <div className='d-flex align-items-center' style={{ marginLeft: '55px' }}>
                                            <ReactStars
                                                count={5}
                                                size={20}
                                                activeColor="#dc3545"
                                                value={Number(item?.rating)}
                                                edit={false}
                                            />
                                            <AiFillDelete
                                                onClick={(e) => setDeleteProductReview(item)}
                                                title='Delete' className='ms-4' style={{ fontSize: '20px', color: '#dc3545' }} />
                                        </div>
                                        <section className='d-flex'>
                                            <Avatar>{item?.user?.name ? item?.user?.name[0] : 'B'}</Avatar>
                                            <ListItem sx={{ paddingTop: 0 }}>
                                                <ListItemText
                                                    primary={item?.user?.name}
                                                    secondary={item?.review}
                                                />
                                            </ListItem>
                                        </section>
                                    </div>
                                    <FormControlLabel
                                        onChange={(e) => setUpdateProductReview({ item, value: e.target.checked })}
                                        control={<Android12Switch checked={item?.approved ? true : false} />}
                                        label={`${item?.approved ? 'Live' : 'off'}`}
                                    />
                                </section>
                                <Divider />
                            </div>
                        })
                    }
                </List>
            </Dialog>
        </div>
    );
}