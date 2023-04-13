import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { CSpinner } from '@coreui/react';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ EditBike, setEditBike, changeFeatured, delLoading, deleteBikeState, setDeleteBike, deleteBike }) {

    const handleClose = () => {
        setEditBike(null);
        setDeleteBike(null);
    };

    return (
        <div>
            <Dialog
                open={EditBike || deleteBikeState ? true : false}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                {
                    deleteBikeState
                        ?
                        <DialogTitle style={{ color: 'red' }}>Delete Confirmation</DialogTitle>
                        :
                        <DialogTitle style={{ color: 'red' }}>{`Edit ${EditBike?.brand}${" "}${EditBike?.category[0]}`}</DialogTitle>
                }
                <DialogContent>
                    {
                        deleteBikeState ?
                            <DialogContentText id="alert-dialog-slide-description">
                                {`Are you sure you want to delete ${deleteBikeState?.brand}${" "}${deleteBikeState?.category[0]}.?`}
                            </DialogContentText>
                            :
                            <DialogContentText id="alert-dialog-slide-description">
                                From here you can change featured/unFeatured status of your bike.
                            </DialogContentText>
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    {
                        deleteBikeState ?
                            <Button onClick={deleteBike}>
                                {
                                    delLoading ? <CSpinner /> : 'Delete Bike'
                                }
                            </Button>
                            :
                            <Button onClick={changeFeatured}>
                                {
                                    delLoading ? <CSpinner /> : EditBike?.featuredUsedBike ? 'UnFeatured' : 'Featured'
                                }
                            </Button>

                    }
                </DialogActions>
            </Dialog>
        </div>
    );
}