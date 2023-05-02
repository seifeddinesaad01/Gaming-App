import * as React from 'react';
import '../Resetpass/Resetpass.css'
import axios from 'axios';
import Stack from '@mui/material/Stack';
import MuiAlert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate, NavLink, useParams } from 'react-router-dom';
import {
    Grid, CssBaseline, Button
} from '@material-ui/core';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

function Resetpass() {
    /*****alert mui*****/
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    /*****alert mui*****/
    const navigate = useNavigate();
    const [Date, setDate] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const [isSubmit, setIsSubmit] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [values, setValues] = React.useState({
        password: "",
    });
    const validateForm = (values) => {
        const error = {};

        if (!values.password) {
            error.password = "Password is required";
        } else if (values.password.length < 6) {
            error.password = "Password must be at least 6 characters";
        } else if (!/^[A-Z]/.test(values.password)) {
            error.password = "Password must start with a capital letter";
        } else if (!/\d/.test(values.password)) {
            error.password = "Password must contain at least one number";
        }

        if (!values.confirmpassword) {
            error.confirmpassword = "Confirm Password is required";
        } else if (values.confirmpassword !== values.password) {
            error.confirmpassword = "Confirm password and password should be same";
        }

        return error;
    };

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleclick = (e) => {
        e.preventDefault();
        setFormErrors(validateForm(values));
        setIsSubmit(true);
    };
    /***controle de date***/
    useEffect(() => {
        const interval = setInterval(() => {
            const { expirationDate } = Date;
            if (expirationDate && new Date() > expirationDate) {
                clearInterval(interval);
                setDate({ expired: true });
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [Date]);

    //recuper les donnes 
    const { id } = useParams();
    console.log(id);
    const { token } = useParams();
    console.log(token);


    /***envoi des données par axios***/
    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            /****GET****/
            // axios.get("http://localhost:5000/user/reset-password/${id}/${token}")
            //     .then((res) => {
            //         const expirationDate = new Date(res.data.expirationDate);
            //         setDate({ expirationDate });

            //     })
            //     .catch((err) => {
            //         console.log(err);
            //     });
            /****GET****/

            /**** POST****/

            const post = {
                newPassword: values.password,
                confirmPassword: values.confirmpassword,
            };
            console.log(post);

            axios.post(`http://localhost:5000/user/reset-password/${id}/${token}`, post)
                .then((response) => {
                    Swal.fire({
                        title: "Password modified successfully",
                        icon: "success",
                        showCancelButton: false,
                        confirmButtonText: "Go login"
                    });
                    navigate("/user/login", { replace: true });
                    console.log("passwort modified");
                    // alert(response.data.message);
                    // navigate("/user/login", { replace: true });
                })
                .catch((error) => {
                    Swal.fire({
                        title: "link expired ",
                        icon: "error",
                        confirmButtonText: "Resend",
                        showCancelButton: false
                    });
                    window.location.reload()
                    console.log("link expired");
                    console.log(error)
                    setErrorMessage(error.response.data.message);
                });
        }
        /****POST****/


    }, [formErrors]);


    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: "100vh", backgroundColor: "#161616" }}
        >
            <CssBaseline />
            <Grid container direction="column" spacing={2} sx={{ width: '50%' }}>
                <Grid item >
                    <div style={{ display: "flex", flexDirection: "column", alignItems: 'center' }}>
                        <h1
                            style={{
                                margin: 0,
                                color: "#FFFFFF",
                                fontFamily: "Mulish, sans-serif",
                                fontWeight: 200,
                                fontSize: 60,
                                marginBottom: 80,
                                letterSpacing: "2px"

                            }}
                        >
                            Reset Password
                        </h1>

                    </div>
                </Grid>
            </Grid>
            {/*****************formulaire****************/}
            <FormControl required sx={{ m: 1, width: '52ch' }} variant="outlined">
                <InputLabel htmlFor="password">New password</InputLabel>
                <OutlinedInput
                    name="password"
                    onChange={handleChange}
                    value={values.password}
                    id="password"
                    label="New password"
                    sx={{
                        '& fieldset': {
                            borderColor: '#FFFFFF80',
                        },
                    }}
                    style={{ color: '#ffffff' }}

                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                style={{ color: "rgb(159, 156, 156)" }}
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
                <Stack spacing={2} sx={{ width: '100%' }}>
                    {formErrors.password && (
                        <Alert severity="error">{formErrors.password}</Alert>
                    )}
                </Stack>
            </FormControl>

            <FormControl required sx={{ m: 1, width: '52ch' }} variant="outlined">
                <InputLabel htmlFor="confirmpassword">Confirm new password</InputLabel>
                <OutlinedInput
                    name="confirmpassword"
                    onChange={handleChange}
                    value={values.confirmpassword}
                    id="confirmpassword"
                    label="Confirm new password"
                    sx={{
                        '& fieldset': {
                            borderColor: '#FFFFFF80',
                        },

                    }}
                    style={{ color: '#ffffff' }}

                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                style={{ color: "rgb(159, 156, 156)" }}
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
                <Stack spacing={2} sx={{ width: '100%' }}>
                    {formErrors.confirmpassword && (
                        <Alert severity="error">{formErrors.confirmpassword}</Alert>
                    )}
                </Stack>
            </FormControl>
            {/* <FormControl sx={{ width: '52ch' }}>
                <p style={{ color: '#343beb', margin: '0', fontSize: 13 }}>
                    The email has been sent successfully and will be valid until {Date.expirationDate}
                </p>
            </FormControl> */}
            <div onClick={handleclick}>
                <Button
                    name='button' type='submit'
                    style={{
                        backgroundColor: '#343beb',
                        borderRadius: "50px",
                        letterSpacing: "3px",
                        marginTop: '50px',
                        width: "200px",
                    }}
                    onClick={handleclick}
                >
                    Reset Password
                </Button>
            </div>

        </Grid>



    );
}
export default Resetpass;
