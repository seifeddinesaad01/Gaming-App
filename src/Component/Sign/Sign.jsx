import * as React from "react";
import "../Sign/Sign.css";
import axios from "axios";
import Stack from "@mui/material/Stack";
import MuiAlert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate, NavLink } from "react-router-dom";
import { Grid, CssBaseline, Button } from "@material-ui/core";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import signupImg from "../../assets/img/inscrit.PNG";

function Sign() {
  /*****alert mui*****/
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  /*****alert mui*****/
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [values, setValues] = React.useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const validateForm = (values) => {
    const error = {};
    const gmail = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.name) {
      error.name = "First Name is required";
    }

    if (!values.lastname) {
      error.lastname = "Last Name is required";
    }

    if (!values.email) {
      error.email = "Email is required";
    } else if (!gmail.test(values.email)) {
      error.email = "Format not valid!";
    }

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
  const isValid = () => {
    if (values.email === "") {
      return false;
    }
    return true;
  };
  const handleclick = (e) => {
    e.preventDefault();
    setFormErrors(validateForm(values));
    setIsSubmit(true);
  };
  /***envoi des données par axios***/
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      const post = {
        name: values.name,
        lastname: values.lastname,
        password: values.password,
        email: values.email,
      };
      console.log(post);
      axios
        .post("http://localhost:5000/user/sign", post)
        .then((response) => {
          if (response.status === 201) console.log("reussit");
          // alert("user created successfully");
          Swal.fire({
            title: "User created successfully",
            icon: "success",
            confirmButtonText: "Go login",
            showCancelButton: false,
          });
          navigate("/user/login", { replace: true });
        })
        .catch((error) => {
          if (error.status === 11000)
            // setErrorMessage(error.response.data.message);
            console.log("echec user exist deja");
          // alert("user already exist");
          Swal.fire({
            title: "User already exists login to your account",
            icon: "error",
            confirmButtonText: "Go login",
            showCancelButton: false,
          });
          navigate("/user/login", { replace: true });
          // addresse n'existe pas dans gmail
          // if (error.status === 400)
          //   console.log("echc adresse email incorrect");
        });
    }
  }, [formErrors]);

  return (
    <div className="signup__container">
      <div className="signup__left" xs={9} sx={{ width: "50%" }}>
        <img src={signupImg} className="signup__img" />
        <h1>Join us!</h1>
      </div>
      <CssBaseline />
      <div className="barRight2">
        <div className="signup__form">
          <p style={{ color: "#fff", margin: "0" }}>Sign Up</p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "2rem",
            }}
          >
            <p style={{ color: "#fff", fontSize: "1.3rem" }}>
              Already member ?
            </p>
            <NavLink
              to="/user/login"
              style={{
                color: "#fff",
                fontSize: 25,
                letterSpacing: "2px",
                textDecoration: "none",
              }}
            >
              Login
            </NavLink>
          </div>

          {/*****************formulaire****************/}
          <FormControl required sx={{ m: 1, width: "52ch" }} variant="outlined">
            <InputLabel htmlFor="name">First Name</InputLabel>
            <OutlinedInput
              name="name"
              onChange={handleChange}
              value={values.name}
              id="name"
              label="First Name"
              sx={{
                "& fieldset": {
                  borderColor: "#FFFFFF80",
                },
              }}
              style={{ color: "#ffffff" }}
            />
            <Stack spacing={2} sx={{ width: "100%" }}>
              {formErrors.name && (
                <Alert severity="error">{formErrors.name}</Alert>
              )}
            </Stack>
          </FormControl>

          <FormControl required sx={{ m: 1, width: "52ch" }} variant="outlined">
            <InputLabel htmlFor="lastname">Last Name</InputLabel>
            <OutlinedInput
              name="lastname"
              onChange={handleChange}
              value={values.lastname}
              id="lastname"
              label="Last Name"
              sx={{
                "& fieldset": {
                  borderColor: "#FFFFFF80",
                },
              }}
              style={{ color: "#ffffff" }}
            />
            <Stack spacing={2} sx={{ width: "100%" }}>
              {formErrors.lastname && (
                <Alert severity="error">{formErrors.lastname}</Alert>
              )}
            </Stack>
          </FormControl>
          {/* </div> */}
          <FormControl required sx={{ m: 1, width: "52ch" }} variant="outlined">
            <InputLabel htmlFor="email">Email</InputLabel>
            <OutlinedInput
              name="email"
              onChange={handleChange}
              value={values.email}
              id="email"
              label="Email"
              sx={{
                "& fieldset": {
                  borderColor: "#FFFFFF80",
                },
              }}
              style={{ color: "#ffffff" }}
            />
            <Stack spacing={2} sx={{ width: "100%" }}>
              {formErrors.email && (
                <Alert severity="error">{formErrors.email}</Alert>
              )}
            </Stack>
          </FormControl>

          <FormControl required sx={{ m: 1, width: "52ch" }} variant="outlined">
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              name="password"
              onChange={handleChange}
              value={values.password}
              id="password"
              label="Password"
              sx={{
                "& fieldset": {
                  borderColor: "#FFFFFF80",
                },
              }}
              style={{ color: "#ffffff" }}
              type={showPassword ? "text" : "password"}
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
            <Stack spacing={2} sx={{ width: "100%" }}>
              {formErrors.password && (
                <Alert severity="error">{formErrors.password}</Alert>
              )}
            </Stack>
          </FormControl>

          <FormControl required sx={{ m: 1, width: "52ch" }} variant="outlined">
            <InputLabel htmlFor="confirmpassword">Confirm Password</InputLabel>
            <OutlinedInput
              name="confirmpassword"
              onChange={handleChange}
              value={values.confirmpassword}
              id="confirmpassword"
              label="Confirm Password"
              sx={{
                "& fieldset": {
                  borderColor: "#FFFFFF80",
                },
              }}
              style={{ color: "#ffffff" }}
              type={showPassword ? "text" : "password"}
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
            <Stack spacing={2} sx={{ width: "100%" }}>
              {formErrors.confirmpassword && (
                <Alert severity="error">{formErrors.confirmpassword}</Alert>
              )}
            </Stack>
          </FormControl>
          <div
            onClick={handleclick}
            style={{ float: "left", marginLeft: "130px" }}
          >
            <button
              disabled={isValid() ? false : true}
              name="button"
              type="submit"
              className="signup__btn"
              onClick={handleclick}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Sign;
