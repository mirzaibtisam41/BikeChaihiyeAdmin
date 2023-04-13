import { CircularProgress } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import axios from 'axios';
import * as React from 'react';
import toast, { Toaster } from "react-hot-toast";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ deleteProductReview, setDeleteProductReview, review }) {

    const [loading, setLoading] = React.useState(false);

    const handleConfirm = async () => {
        setLoading(true);
        const obj = {
            pId: review?._id,
            rId: deleteProductReview?._id,
        }
        const { data } = await axios.post('https://bikechahiye.onrender.com/api/product/deleteProductReview', obj);
        if (data) {
            setLoading(false);
            const _filter = review?.pRatingsReviews?.filter(item => item?._id !== deleteProductReview?._id);
            review.pRatingsReviews = _filter;
            toast.success(data?.success);
            handleClose();
        }
    }

    const handleClose = () => {
        setDeleteProductReview(null);
    };

    return (
        <div>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <Dialog
                open={deleteProductReview ? true : false}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle className='text-danger'>{"Confirmation"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {`Are you sure you want to delete this review ?`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {
                        loading === true
                            ?
                            <CircularProgress />
                            :
                            <>
                                <Button onClick={handleClose}>Close</Button>
                                <Button onClick={handleConfirm}>Confirm</Button>
                            </>
                    }
                </DialogActions>
            </Dialog>
        </div>
    );
}