import * as React from "react";
import "../Login/Login.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { useNavigate, NavLink, Link, useParams } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import loginimg from "../../assets/img/inscrit.PNG";
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);
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
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className={`form-control${
                    errors.email && touched.email ? " is-invalid" : ""
                  }`}
                />
                <div className="login__error">
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-group">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    className={`form-control${
                      errors.password && touched.password ? " is-invalid" : ""
                    }`}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={togglePassword}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                  <div className="login__error">
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                </div>
              </div>

              {/* <button type="submit" className="btn btn-primary">
                Login
              </button> */}
            </Form>
          )}
        </Formik>
        <div
          // onClick={handleclick}
          style={{ float: "left", marginLeft: "130px" }}
        >
          <button
            className="login__btn"
            // disabled={isValid() ? false : true}
            name="button"
            type="submit"
            // onClick={handleclick}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
export default Login;
