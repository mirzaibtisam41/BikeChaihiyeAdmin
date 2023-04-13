import CloseIcon from '@mui/icons-material/Close';
import {
    CircularProgress,
    FormControl,
    InputLabel,
    MenuItem,
    Select
} from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Dialog from '@mui/material/Dialog';
import Grid from "@mui/material/Grid";
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Slide from '@mui/material/Slide';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { Formik } from "formik";
import * as React from 'react';
import toast, { Toaster } from "react-hot-toast";
import * as Yup from 'yup';
import { createObject } from './Script';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const theme = createTheme();

export default function FullScreenDialog({ newPart, setNewPart }) {
    const [loading, setLoading] = React.useState(false);
    const [brands, setBrands] = React.useState([]);
    const [powers, setPowers] = React.useState([]);

    const schema = Yup.object().shape({
        Name: Yup.string().required(),
        Email: Yup.string().required(),
        CNIC: Yup.number().required(),
        Password: Yup.string().required(),
        Phone: Yup.number().required(),
        "Shop Name": Yup.string().required(),
        City: Yup.string().required(),
        "Vendor Pic": Yup.string().required(),
        Address: Yup.string().required(),
    });

    const createBike = async (values, resetForm) => {
        setLoading(true);
        const obj = createObject(values);
        try {
            const { data } = await axios.post(
                'https://bikechahiye.onrender.com/api/vendor/register',
                obj
            );
            if (data?._id) {
                setLoading(false);
                toast.success('Vendor Added Successfully');
                resetForm();
                setNewPart(null);
            }
        } catch (error) {
            setLoading(false);
            toast.error("Server error...!", {
                style: {
                    background: "#333",
                    color: "#fff",
                },
            });
        }
    };

    const handleClose = () => {
        setNewPart(false);
    };

    return (
        <div>
            <Dialog
                fullScreen
                open={newPart ? true : false}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
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
                            Vendor
                        </Typography>
                    </Toolbar>
                </AppBar>
                <List>
                    <React.Fragment>
                        <ThemeProvider theme={theme}>
                            <Toaster position="top-right" reverseOrder={false} />
                            <Container component="main" maxWidth="lg">
                                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                                    <h2>Create New Vendor</h2>
                                </div>
                                <CssBaseline />
                                <Formik
                                    validationSchema={schema}
                                    initialValues={{
                                        Name: "",
                                        Email: "",
                                        CNIC: "",
                                        Password: "",
                                        Phone: "",
                                        "Shop Name": "",
                                        City: "",
                                        "Vendor Pic": "",
                                        Address: "",
                                    }}
                                    onSubmit={(values, { resetForm }) => createBike(values, resetForm)}
                                >
                                    {({
                                        handleChange,
                                        handleSubmit,
                                        errors,
                                        touched,
                                        values,
                                        setFieldValue,
                                    }) => (
                                        <Box
                                            sx={{
                                                marginTop: 3,
                                                marginBottom: 3,
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                            }}
                                        >
                                            <Box component="form" noValidate>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} sm={6}>
                                                        <TextField
                                                            autoComplete="given-name"
                                                            name="Name"
                                                            required
                                                            fullWidth
                                                            id="name"
                                                            label="Name"
                                                            value={values.Name}
                                                            autoFocus
                                                            onChange={handleChange}
                                                            variant="filled"
                                                            sx={{ borderStyle: "none" }}
                                                            error={errors.Name && touched.Name ? true : false}
                                                        />
                                                        {errors.Name && touched.Name && (
                                                            <Typography color={"error.main"}>
                                                                {errors.Name}
                                                            </Typography>
                                                        )}
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <TextField
                                                            autoComplete="given-name"
                                                            name="Email"
                                                            required
                                                            fullWidth
                                                            id="Email"
                                                            label="Email"
                                                            value={values.Email}
                                                            autoFocus
                                                            type={'email'}
                                                            onChange={handleChange}
                                                            variant="filled"
                                                            sx={{ borderStyle: "none" }}
                                                            error={errors.Email && touched.Email ? true : false}
                                                        />
                                                        {errors.Email && touched.Email && (
                                                            <Typography color={"error.main"}>
                                                                {errors.Email}
                                                            </Typography>
                                                        )}
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <TextField
                                                            autoComplete="given-name"
                                                            name="CNIC"
                                                            required
                                                            fullWidth
                                                            id="CNIC"
                                                            label="CNIC"
                                                            value={values.CNIC}
                                                            autoFocus
                                                            type={'CNIC'}
                                                            onChange={handleChange}
                                                            variant="filled"
                                                            sx={{ borderStyle: "none" }}
                                                            error={errors.CNIC && touched.CNIC ? true : false}
                                                        />
                                                        {errors.CNIC && touched.CNIC && (
                                                            <Typography color={"error.main"}>
                                                                {errors.CNIC}
                                                            </Typography>
                                                        )}
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <TextField
                                                            required
                                                            fullWidth
                                                            id="Phone"
                                                            label="Phone"
                                                            name="Phone"
                                                            autoComplete="Phone"
                                                            value={values.Phone}
                                                            variant='filled'
                                                            onChange={handleChange}
                                                            error={errors.Phone && touched.Phone ? true : false}
                                                        />
                                                        {errors.Phone && touched.Phone && (
                                                            <Typography color={"error.main"}>
                                                                {errors.Phone}
                                                            </Typography>
                                                        )}
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <TextField
                                                            required
                                                            fullWidth
                                                            id="Shop Name"
                                                            label="Shop Name"
                                                            name="Shop Name"
                                                            autoComplete="Shop Name"
                                                            variant='filled'
                                                            value={values['Shop Name']}
                                                            onChange={handleChange}
                                                            error={
                                                                errors['Shop Name'] && touched['Shop Name']
                                                                    ? true
                                                                    : false
                                                            }
                                                        />
                                                        {errors['Shop Name'] && touched['Shop Name'] && (
                                                            <Typography color={"error.main"}>
                                                                {errors['Shop Name']}
                                                            </Typography>
                                                        )}
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <TextField
                                                            required
                                                            fullWidth
                                                            id="City"
                                                            label="City"
                                                            name="City"
                                                            autoComplete="City"
                                                            variant='filled'
                                                            value={values['City']}
                                                            onChange={handleChange}
                                                            error={
                                                                errors['City'] && touched['City']
                                                                    ? true
                                                                    : false
                                                            }
                                                        />
                                                        {errors['City'] && touched['City'] && (
                                                            <Typography color={"error.main"}>
                                                                {errors['City']}
                                                            </Typography>
                                                        )}
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <TextField
                                                            required
                                                            fullWidth
                                                            id="Address"
                                                            label="Address"
                                                            name="Address"
                                                            autoComplete="Address"
                                                            variant='filled'
                                                            value={values['Address']}
                                                            onChange={handleChange}
                                                            error={
                                                                errors['Address'] && touched['Address']
                                                                    ? true
                                                                    : false
                                                            }
                                                        />
                                                        {errors['Address'] && touched['Address'] && (
                                                            <Typography color={"error.main"}>
                                                                {errors['Address']}
                                                            </Typography>
                                                        )}
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <TextField
                                                            required
                                                            fullWidth
                                                            id="Vendor Pic"
                                                            name="Vendor Pic"
                                                            autoComplete="Vendor Pic"
                                                            inputProps={{
                                                                multiple: true,
                                                            }}
                                                            onChange={(e) => {
                                                                setFieldValue("Vendor Pic", e.target.files[0]);
                                                            }}
                                                            type={"file"}
                                                            error={
                                                                errors["Vendor Pic"] && touched["Vendor Pic"]
                                                                    ? true
                                                                    : false
                                                            }
                                                        />
                                                        {errors["Vendor Pic"] && touched["Vendor Pic"] && (
                                                            <Typography color={"error.main"}>
                                                                {errors["Vendor Pic"]}
                                                            </Typography>
                                                        )}
                                                    </Grid>
                                                    <Grid item xs={12} sm={12}>
                                                        <TextField
                                                            required
                                                            fullWidth
                                                            name="Password"
                                                            label="Passwords"
                                                            id="Password"
                                                            variant='filled'
                                                            value={values["Password"]}
                                                            type={'password'}
                                                            onChange={handleChange}
                                                            error={
                                                                errors["Password"] && touched["Password"]
                                                                    ? true
                                                                    : false
                                                            }
                                                        />
                                                        {errors["Password"] && touched["Password"] && (
                                                            <Typography color={"error.main"}>
                                                                {errors["Password"]}
                                                            </Typography>
                                                        )}
                                                    </Grid>
                                                </Grid>
                                                <Button
                                                    fullWidth
                                                    variant="contained"
                                                    color="error"
                                                    sx={{ mt: 3, mb: 2 }}
                                                    onClick={handleSubmit}
                                                    disabled={loading ? true : false}
                                                    size='large'
                                                >
                                                    {loading ? (
                                                        <CircularProgress />
                                                    ) : (
                                                        "Create"
                                                    )}
                                                </Button>
                                            </Box>
                                        </Box>
                                    )}
                                </Formik>
                            </Container>
                        </ThemeProvider>
                    </React.Fragment>
                </List>
            </Dialog>
        </div>
    );
}