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

export default function AlertDialogSlide({ deleteUser, setDeleteUser, deleteUserFn, delLoading }) {

    const handleClose = () => {
        setDeleteUser(null);
    };

    return (
        <div>
            <Dialog
                open={deleteUser ? true : false}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle style={{ color: 'red' }}>Delete User Confirmation</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {` Are you sure you want to delete ${deleteUser?.name} from this list?`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    <Button onClick={deleteUserFn}>
                        {
                            delLoading ? <CSpinner /> : 'Delete User'
                        }
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}