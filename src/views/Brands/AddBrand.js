import CloseIcon from '@mui/icons-material/Close';
import {
    CircularProgress
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

export default function FullScreenDialog({ NewBrand, setNewBrand, Brands, setBrands }) {
    const [loading, setLoading] = React.useState(false);

    const schema = Yup.object().shape({
        Name: Yup.string().required(),
        "Brand Pic": Yup.string().required(),
    });

    React.useEffect(() => {
        getBrands();
    }, []);

    const getBrands = async () => {
        const { data } = await axios.get('https://bikechahiye.onrender.com/api/category');
        if (data) {
            setBrands(data);
        }
    }

    const createBike = async (values, resetForm) => {
        setLoading(true);
        const obj = createObject(values);
        try {
            const { data } = await axios.post(
                'https://bikechahiye.onrender.com/api/category/createBrand',
                obj
            );
            if (data._id) {
                setLoading(false);
                toast.success('Brand Created Successfully');
                setBrands([data, ...Brands]);
                resetForm();
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
        setNewBrand(false);
    };

    return (
        <div>
            <Dialog
                fullScreen
                open={NewBrand ? true : false}
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
                            Brand
                        </Typography>
                    </Toolbar>
                </AppBar>
                <List>
                    <React.Fragment>
                        <ThemeProvider theme={theme}>
                            <Toaster position="top-right" reverseOrder={false} />
                            <Container component="main" maxWidth="lg">
                                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                                    <h2>Create New Brand</h2>
                                </div>
                                <CssBaseline />
                                <Formik
                                    validationSchema={schema}
                                    initialValues={{
                                        Name: "",
                                        "Brand Pic": "",
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
                                                    <Grid item xs={12} sm={12}>
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
                                                    <Grid item xs={12} sm={12}>
                                                        <TextField
                                                            required
                                                            fullWidth
                                                            id="Brand Pic"
                                                            name="Brand Pic"
                                                            autoComplete="Brand Pic"
                                                            variant='standard'
                                                            inputProps={{
                                                                multiple: true,
                                                            }}
                                                            onChange={(e) => setFieldValue("Brand Pic", e.target.files[0])}
                                                            type={"file"}
                                                            error={
                                                                errors["Brand Pic"] && touched["Brand Pic"]
                                                                    ? true
                                                                    : false
                                                            }
                                                        />
                                                        {errors["Brand Pic"] && touched["Brand Pic"] && (
                                                            <Typography color={"error.main"}>
                                                                {errors["Brand Pic"]}
                                                            </Typography>
                                                        )}
                                                    </Grid>
                                                </Grid>
                                                <Button
                                                    fullWidth
                                                    variant="contained"
                                                    sx={{ mt: 3, mb: 2 }}
                                                    color='error'
                                                    onClick={handleSubmit}
                                                    disabled={loading ? true : false}
                                                    size='large'
                                                >
                                                    {loading ? (
                                                        <CircularProgress style={{ color: "#dc3545" }} />
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