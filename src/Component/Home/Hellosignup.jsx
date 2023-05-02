import React from "react";
import test0 from "../../assets/img/hellosignup.jpg";
//import './Home.css';
import "./Hellosignup.css";
import gameBg from "../../assets/img/banner-bg.png";
import { NavLink } from "react-router-dom";
function Hellosignup() {
  return (
    <div className="hello__container">
      <div className="hello__left">
        <h1 className="hello__text">
          The best place <br /> &nbsp; to play and enjoy <br /> &nbsp; Join us
          now !{" "}
        </h1>
        <NavLink to="/user/sign" style={{ textDecoration: "none" }}>
          <button className="hello-btn">Sign Up</button>
        </NavLink>
      </div>
      <img
        src={test0}
        style={{ width: "50rem", marginLeft: "2rem", borderRadius: "2rem" }}
        alt="bg"
        className="hello__img"
      />
    </div>
  );
}
export default Hellosignup;
