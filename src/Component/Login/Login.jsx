import * as React from "react";
import "../Login/Login.css";
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
import { useNavigate, NavLink, Link, useParams } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import loginimg from "../../assets/img/inscrit.PNG";

function Login() {
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
    email: "",
    password: "",
  });
  const validateForm = (values) => {
    const error = {};
    const gmail = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.email) {
      error.email = "Email is required";
    } else if (!gmail.test(values.email)) {
      error.email = "Format not valid!";
    }

    if (!values.password) {
      error.password = "Password is required";
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
  //recuperer les donnees d'url
  /***envoi des données par axios ***/
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      const post = {
        email: values.email,
        password: values.password,
      };
      axios
        .post("http://localhost:5000/user/login", post)
        .then((response) => {
          if (response.status === 200)
            Swal.fire({
              title: "User logged successfully",
              icon: "success",
              showCancelButton: false,
            });
          navigate(`/user/profile`, { replace: true });
        })
        .catch((error) => {
          Swal.fire({
            title: "user does not exist",
            icon: "error",
            confirmButtonText: "Signup",
            showCancelButton: false,
          });
          console.log("user non trouvé");
          navigate(`/user/sign`, { replace: true });
          // console.log(error.response.data);
        });
    }
  }, [formErrors]);
  return (
    <div className="login__container">
      <div className="login__left">
        <img src={loginimg} className="login__img" />
        <h1 className="welcom">Welcome again !</h1>
      </div>
      <CssBaseline />
      <div item className="barRight1" xs={3} sx={{ marginLeft: 50 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1
            style={{
              margin: 0,
              color: "#FFFFFF",
              fontFamily: "'PT Sans', sans-serif",
              fontWeight: 200,
              fontSize: 70,
              marginBottom: 20,
              letterSpacing: "4px",
              border: "4px",
            }}
          >
            Login
          </h1>
          <div style={{ display: "flex", marginBottom: 30 }}>
            <h6
              style={{
                marginTop: "-15px",
                marginBottom: "-60px",
                color: "#FFFFFF",
                fontWeight: 100,
                fontSize: 15,
                letterSpacing: "2px",
                fontFamily: "'PT Sans', sans-serif",
              }}
            >
              Not a member ?
            </h6>
            <NavLink
              to="/user/sign"
              style={{
                marginLeft: 20,
                marginTop: "-23px",
                marginBottom: "-60px",
                color: "#fff",
                fontSize: 25,
                letterSpacing: "2px",
                textDecoration: "none",
                fontFamily: "'PT Sans', sans-serif",
                // borderBottom: "1px solid #fff"
              }}
            >
              Signup
            </NavLink>
          </div>
        </div>

        {/*****************formulaire****************/}
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
                borderColor: "#fff",
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
                borderColor: "#fff",
              },
            }}
            style={{ color: "#fff" }}
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
        <FormControl sx={{ width: "52ch" }}>
          <Link
            style={{
              textDecoration: "none",
              color: "#fff",
              marginLeft: "1rem",
            }}
            to={"/user/forgot-password"}
          >
            {" "}
            Forgot Password ?
          </Link>
        </FormControl>

        <div
          onClick={handleclick}
          style={{ float: "left", marginLeft: "130px" }}
        >
          <button
            className="login__btn"
            disabled={isValid() ? false : true}
            name="button"
            type="submit"
            onClick={handleclick}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
export default Login;
