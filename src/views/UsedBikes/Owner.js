import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs({ ownerDetail, setOwnerDetail }) {

    const handleClose = () => {
        setOwnerDetail(null);
    };

    return (
        <div>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={ownerDetail ? true : false}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Owner Details
                </BootstrapDialogTitle>
                <DialogContent dividers sx={{ minWidth: '500px' }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginBottom: '10px'
                    }}>
                        <img style={{ width: '100px', height: '100px' }} src={`https://bikechahiye.onrender.com/${ownerDetail?.profileImg}`} />
                    </div>
                    <Typography gutterBottom>
                        <span style={{ color: 'red' }}>Name:</span>
                        {`${" "}${ownerDetail?.name}`}
                    </Typography>
                    <Typography gutterBottom>
                        <span style={{ color: 'red' }}>Email:</span>
                        {`${" "}${ownerDetail?.email}`}
                    </Typography>
                    <Typography gutterBottom>
                        <span style={{ color: 'red' }}>Phone:</span>
                        {`${" "}${ownerDetail?.phone}`}
                    </Typography>
                    <Typography gutterBottom>
                        <span style={{ color: 'red' }}>Address:</span>
                        {`${" "}${ownerDetail?.address}`}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}