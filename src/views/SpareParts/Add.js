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
        Brand: Yup.string().required(),
        Category: Yup.string().required(),
        Price: Yup.number().required(),
        Discount: Yup.number().required(),
        Types: Yup.string().required(),
        Active: Yup.string().required(),
        "Part Pic": Yup.string().required(),
        Detail: Yup.string().required(),
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

    const getSelectedBrand = async (_id) => {
        try {
            const { data } = await axios.post('https://bikechahiye.onrender.com/api/category/getBrandWithPower', { _id });
            if (data) {
                setPowers(data.power);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const createBike = async (values, resetForm) => {
        setLoading(true);
        const obj = createObject(values);
        try {
            const { data } = await axios.post(
                'https://bikechahiye.onrender.com/api/spareParts/createParts',
                obj
            );
            if (data.success) {
                setLoading(false);
                toast.success(data.success);
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
                            Spare Part
                        </Typography>
                    </Toolbar>
                </AppBar>
                <List>
                    <React.Fragment>
                        <ThemeProvider theme={theme}>
                            <Toaster position="top-right" reverseOrder={false} />
                            <Container component="main" maxWidth="lg">
                                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                                    <h2>Create New Spare Part</h2>
                                </div>
                                <CssBaseline />
                                <Formik
                                    validationSchema={schema}
                                    initialValues={{
                                        Name: "",
                                        Brand: "",
                                        Category: "",
                                        Price: "",
                                        Discount: "",
                                        Types: "",
                                        Active: "",
                                        "Part Pic": "",
                                        Detail: "",
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
                                                        <FormControl fullWidth>
                                                            <InputLabel id="demo-simple-select-label">
                                                                Brand *
                                                            </InputLabel>
                                                            <Select
                                                                required
                                                                fullWidth
                                                                id="brand"
                                                                label="Brand"
                                                                name="Brand"
                                                                autoComplete="brand"
                                                                variant='filled'
                                                                value={values.Brand}
                                                                onChange={handleChange}
                                                                error={errors.Brand && touched.Brand ? true : false}
                                                            >
                                                                <MenuItem disabled value={10}>
                                                                    Choose Brand
                                                                </MenuItem>
                                                                {brands?.map((item) => {
                                                                    return (
                                                                        <MenuItem
                                                                            key={item?._id}
                                                                            value={item?.brand}
                                                                            onClick={(e) => getSelectedBrand(item?._id)}
                                                                        >
                                                                            {item?.brand}
                                                                        </MenuItem>
                                                                    );
                                                                })}
                                                            </Select>
                                                        </FormControl>
                                                        {errors.Brand && touched.Brand && (
                                                            <Typography color={"error.main"}>
                                                                {errors.Brand}
                                                            </Typography>
                                                        )}
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <FormControl fullWidth>
                                                            <InputLabel id="demo-simple-select-label">
                                                                Category *
                                                            </InputLabel>
                                                            <Select
                                                                required
                                                                fullWidth
                                                                id="category"
                                                                label="Category"
                                                                name="Category"
                                                                autoComplete="category"
                                                                variant='filled'
                                                                value={values.Category}
                                                                onChange={handleChange}
                                                                error={
                                                                    errors.Category && touched.Category ? true : false
                                                                }
                                                            >
                                                                <MenuItem disabled value={10}>
                                                                    Choose Category
                                                                </MenuItem>
                                                                {powers?.map((item) => {
                                                                    return (
                                                                        <MenuItem key={item?._id} value={item?.power}>
                                                                            {item?.power}
                                                                        </MenuItem>
                                                                    );
                                                                })}
                                                            </Select>
                                                        </FormControl>
                                                        {errors.Category && touched.Category && (
                                                            <Typography color={"error.main"}>
                                                                {errors.Category}
                                                            </Typography>
                                                        )}
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <TextField
                                                            required
                                                            fullWidth
                                                            id="price"
                                                            label="Price"
                                                            name="Price"
                                                            autoComplete="price"
                                                            value={values.Price}
                                                            variant='filled'
                                                            onChange={handleChange}
                                                            error={errors.Price && touched.Price ? true : false}
                                                        />
                                                        {errors.Price && touched.Price && (
                                                            <Typography color={"error.main"}>
                                                                {errors.Price}
                                                            </Typography>
                                                        )}
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <TextField
                                                            required
                                                            fullWidth
                                                            id="discount"
                                                            label="Discount"
                                                            name="Discount"
                                                            autoComplete="discount"
                                                            variant='filled'
                                                            value={values.Discount}
                                                            onChange={handleChange}
                                                            error={
                                                                errors.Discount && touched.Discount
                                                                    ? true
                                                                    : false
                                                            }
                                                        />
                                                        {errors.Discount && touched.Discount && (
                                                            <Typography color={"error.main"}>
                                                                {errors.Discount}
                                                            </Typography>
                                                        )}
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <FormControl fullWidth>
                                                            <InputLabel id="demo-simple-select-label">
                                                                Types *
                                                            </InputLabel>
                                                            <Select
                                                                required
                                                                fullWidth
                                                                id="types"
                                                                label="Types"
                                                                name="Types"
                                                                autoComplete="types"
                                                                variant='filled'
                                                                value={values.Types}
                                                                onChange={handleChange}
                                                                error={
                                                                    errors.Types && touched.Types ? true : false
                                                                }
                                                            >
                                                                <MenuItem disabled value={10}>
                                                                    Choose Types
                                                                </MenuItem>
                                                                {['Bike Equipments', 'Bike OutFits', 'Others']?.map((item) => {
                                                                    return (
                                                                        <MenuItem key={item} value={item}>
                                                                            {item}
                                                                        </MenuItem>
                                                                    );
                                                                })}
                                                            </Select>
                                                        </FormControl>
                                                        {errors.Types && touched.Types && (
                                                            <Typography color={"error.main"}>
                                                                {errors.Types}
                                                            </Typography>
                                                        )}
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <FormControl fullWidth>
                                                            <InputLabel id="demo-simple-select-label">
                                                                Status *
                                                            </InputLabel>
                                                            <Select
                                                                required
                                                                fullWidth
                                                                id="active"
                                                                label="Active"
                                                                name="Active"
                                                                autoComplete="active"
                                                                variant='filled'
                                                                value={values.Active}
                                                                onChange={handleChange}
                                                                error={
                                                                    errors.Active && touched.Active ? true : false
                                                                }
                                                            >
                                                                <MenuItem disabled value={10}>
                                                                    Choose Active
                                                                </MenuItem>
                                                                {['Active', 'Non Active']?.map((item) => {
                                                                    return (
                                                                        <MenuItem key={item} value={item}>
                                                                            {item}
                                                                        </MenuItem>
                                                                    );
                                                                })}
                                                            </Select>
                                                        </FormControl>
                                                        {errors.Active && touched.Active && (
                                                            <Typography color={"error.main"}>
                                                                {errors.Active}
                                                            </Typography>
                                                        )}
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <TextField
                                                            required
                                                            fullWidth
                                                            id="Part Pic"
                                                            name="Part Pic"
                                                            autoComplete="Part Pic"
                                                            inputProps={{
                                                                multiple: true,
                                                            }}
                                                            onChange={(e) => {
                                                                if (e.target.files.length !== 3) {
                                                                    toast.error("Please Select 3 Images");
                                                                } else {
                                                                    setFieldValue("Part Pic", e.target.files);
                                                                }
                                                            }}
                                                            type={"file"}
                                                            error={
                                                                errors["Part Pic"] && touched["Part Pic"]
                                                                    ? true
                                                                    : false
                                                            }
                                                        />
                                                        {errors["Part Pic"] && touched["Part Pic"] && (
                                                            <Typography color={"error.main"}>
                                                                {errors["Part Pic"]}
                                                            </Typography>
                                                        )}
                                                    </Grid>
                                                    <Grid item xs={12} sm={12}>
                                                        <TextField
                                                            required
                                                            fullWidth
                                                            name="Detail"
                                                            label="Details"
                                                            id="detail"
                                                            variant='filled'
                                                            value={values["Detail"]}
                                                            multiline
                                                            rows={3}
                                                            onChange={handleChange}
                                                            error={
                                                                errors["Detail"] && touched["Detail"]
                                                                    ? true
                                                                    : false
                                                            }
                                                        />
                                                        {errors["Detail"] && touched["Detail"] && (
                                                            <Typography color={"error.main"}>
                                                                {errors["Detail"]}
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