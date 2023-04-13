import CloseIcon from '@mui/icons-material/Close';
import { Container, Grid } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Slide from '@mui/material/Slide';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import * as Yup from 'yup';
import { CircularProgress } from "@mui/material";
import Button from '@mui/material/Button';
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { Formik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ Category, setCategory, setBrands, Brands }) {
    const [loading, setLoading] = React.useState(false);
    const theme = createTheme();

    const schema = Yup.object().shape({
        Name: Yup.string().required(),
    });

    const handleClose = () => {
        setCategory(false);
    };

    const createCategory = async (values, resetForm) => {
        setLoading(true);
        try {
            const { data } = await axios.post(
                'https://bikechahiye.onrender.com/api/category/addPower',
                {
                    brand: Category?._id,
                    power: values.Name
                }
            );
            if (data._id) {
                setLoading(false);
                toast.success('Catefory Added Successfully');
                setCategory(data);
                const _map = Brands?.map(item => {
                    if (item?._id === data?._id) {
                        item = data;
                    }
                    return item;
                });
                setBrands(_map);
                resetForm();
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
            toast.error("Server error...!", {
                style: {
                    background: "#333",
                    color: "#fff",
                },
            });
        }
    };

    return (
        <div>
            <Dialog
                fullScreen
                open={Category ? true : false}
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
                            {Category?.brand}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Container>
                    <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                        <h2>Available Powers</h2>
                    </div>
                    <Grid container spacing={10}>
                        <Grid item xs={8}>
                            {
                                Category?.power?.length === 0 ?
                                    <h5 style={{
                                        textAlign: 'center',
                                        marginTop: '3rem',
                                        color: 'red'
                                    }}>List is empty</h5>
                                    :
                                    <List>
                                        {
                                            Category?.power?.map(item => {
                                                return <div key={item?._id}>
                                                    <ListItem>
                                                        <ListItemText primary={item?.power} secondary={Category?.brand} />
                                                    </ListItem>
                                                    <Divider />
                                                </div>
                                            })
                                        }

                                    </List>
                            }
                        </Grid>
                        <Grid item xs={4}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    '& > :not(style)': {
                                        width: '100%',
                                        height: '100%',
                                    },
                                }}
                            >
                                <Paper variant="outlined">
                                    <React.Fragment>
                                        <ThemeProvider theme={theme}>
                                            <Toaster position="top-right" reverseOrder={false} />
                                            <Container component="main" maxWidth="lg">
                                                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                                                    <h4>Add New Power</h4>
                                                </div>
                                                <CssBaseline />
                                                <Formik
                                                    validationSchema={schema}
                                                    initialValues={{
                                                        Name: "",
                                                    }}
                                                    onSubmit={(values, { resetForm }) => createCategory(values, resetForm)}
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
                                                                </Grid>
                                                                <Button
                                                                    fullWidth
                                                                    variant="contained"
                                                                    sx={{ mt: 3, mb: 2 }}
                                                                    onClick={handleSubmit}
                                                                    disabled={loading ? true : false}
                                                                    size='large'
                                                                    color='error'
                                                                >
                                                                    {loading ? (
                                                                        <CircularProgress style={{ color: "#dc3545" }} />
                                                                    ) : (
                                                                        "Add"
                                                                    )}
                                                                </Button>
                                                            </Box>
                                                        </Box>
                                                    )}
                                                </Formik>
                                            </Container>
                                        </ThemeProvider>
                                    </React.Fragment>
                                </Paper>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Dialog>
        </div>
    );
}