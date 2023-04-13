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

export default function AlertDialogSlide({ updateProductReview, setUpdateProductReview, review }) {

    const [loading, setLoading] = React.useState(false);

    const handleConfirm = async () => {
        setLoading(true);
        const obj = {
            rId: updateProductReview?.item?._id,
            pId: review?._id,
            approved: updateProductReview?.value
        }
        const { data } = await axios.post('https://bikechahiye.onrender.com/api/product/updateProductReview', obj);
        if (data) {
            setLoading(false);
            review?.pRatingsReviews?.forEach(item => {
                if (item?._id === obj.rId) {
                    item.approved = obj.approved
                }
            });
            toast.success(data?.message);
            handleClose();
        }
    }

    const handleClose = () => {
        setUpdateProductReview(null);
    };

    return (
        <div>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <Dialog
                open={updateProductReview ? true : false}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle className='text-danger'>{"Confirmation"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {`Are you sure you want to ${updateProductReview?.value === true ? 'Publish' : 'Hide'} this review ?`}
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