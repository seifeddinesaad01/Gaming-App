import React from "react";
import test0 from "../../assets/img/test0.jpg";
import "./Home.css";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import Hello from "./Hellosignup";
import Aboutus from "./Aboutus";
import Test from "./Test";
import Slider from "./Slider";
import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";
// import SimpleSlider from './Slider';
function Home() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Nav />
      <Hello />
      <Aboutus />
      <Slider />
      <Footer />
    </div>
  );
}
export default Home;
