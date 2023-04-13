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

export default function AlertDialogSlide({ EditVendor, setEditVendor, EditVendorFn, delLoading, deleteBikeState, setDeleteBike, deleteBike }) {

    const handleClose = () => {
        setEditVendor(null);
    };

    return (
        <div>
            <Dialog
                open={EditVendor ? true : false}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle style={{ color: 'red' }}>{`Edit${" "}${EditVendor?.name}`}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        From here you can change featured/unFeatured status of vendor.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    <Button onClick={EditVendorFn}>
                        {
                            delLoading ? <CSpinner /> : EditVendor?.featuredVendor ? 'UnFeatured' : 'Featured'
                        }
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}