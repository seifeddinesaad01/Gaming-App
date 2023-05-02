import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { ImCross } from "react-icons/im";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../img/logo.png";
import { Link, NavLink, Navigate, useNavigate } from "react-router-dom";
import Home from "../Home/Home";
import Tournaments from "../Tournaments/Tournaments";
import Videos from "../Videos/Videos";
import "./nav.css";
import { useWindowSize } from "../../utils/useSizeWindow";
import navIcon1 from "../img/nav-icon1.svg";
import navIcon2 from "../img/nav-icon2.svg";
import navIcon3 from "../img/nav-icon3.svg";
import { useState } from "react";
const pages = ["Home", "Tournaments", "Videos"];

function Nav() {
  const { width } = useWindowSize();
const navigate = useNavigate()
  const [openDrawer, setOpenDrawer] = useState(false);
  //barre recherche fin
  const links = ["Home", "Videos", "Tournaments"];
  return (
    <div className="navbar__container">
      <div className="logo">
        <img src={logo} style={{ height: "8vh" }} />
      </div>
      {width > 800 ? (
        <ul className="links">
          {links?.map((link, index) => {
            return (
              // <Link to={link} className="link__route">
                <li key={index} className="nav__link" onClick={()=> navigate(`/${link}`)}>
                  {link}
                </li>
              // </Link>
            );
          })}
        </ul>
      ) : (
        <div className="menu__icon" onClick={() => setOpenDrawer(true)}>
          <MenuIcon
            style={{
              color: "#fff",
              fontSize: "2rem",
            }}
          />
        </div>
      )}
      {openDrawer ? (
        <>
          <div className="drawer__container">
            <div className="drawer__top">
              <img src={logo} style={{ height: "6rem" }} />
              <div onClick={() => setOpenDrawer(false)}>
                <ImCross cursor="pointer" color="white" />
              </div>
            </div>
            <ul className="drawer__links">
              {links?.map((link, index) => {
                return (
              
                    <li className="drawer__link " key={index} onClick={()=> navigate(`/${link}`)}>{link}</li>
                  
                );
              })}
            </ul>
            <div className="drawer-buttons">
              <NavLink
                to="/user/login"
                onClick={() => setOpenDrawer(false)}
                style={{ textDecoration: "none" }}
              >
                <button className="nav__btn">Login</button>
              </NavLink>
              <NavLink
                to="/user/sign"
                onClick={() => setOpenDrawer(false)}
                style={{ textDecoration: "none" }}
              >
                <button className="nav__btn">Signup</button>
              </NavLink>
            </div>
            <div className="social-icon">
              <a href="#">
                <img src={navIcon1} alt="" />
              </a>
              <a href="#">
                <img src={navIcon2} alt="" />
              </a>
              <a href="#">
                <img src={navIcon3} alt="" />
              </a>
            </div>
            <div style={{marginTop: '8rem', paddingLeft: '2rem'}}>
              <p>© All Right Reserved</p>
            </div>
          </div>
          <div className="overlay" onClick={() => setOpenDrawer(false)}></div>
        </>
      ) : (
        <p></p>
      )}
      {/* <div className="search__field">
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Rechercher...."
            inputProps={{ "aria-label": "search" }}
            style={{ color: "#FFFFFF" }}
          />
        </Search>
      </div> */}
      <div className="nav-buttons">
        <NavLink to="/user/login" style={{ textDecoration: "none" }}>
          <button className="nav__btn">Login</button>
        </NavLink>
        {/* <NavLink to="/user/sign" style={{ textDecoration: "none" }}>
          <button className="nav__btn">Signup</button>
        </NavLink> */}
      </div>
    </div>
  );
}
{
  /* <div className="social-icon">
<a href="#"><img src={navIcon1} alt="" /></a>
<a href="#"><img src="https://th.bing.com/th/id/R.24b3e22f73d6957bce3abdb0968990cb?rik=VZb20S6CtzvQog&riu=http%3a%2f%2f4.bp.blogspot.com%2f-Rm3giw7mj_8%2fVQLP1ZWAVwI%2fAAAAAAAAXw0%2fWPoJhWJu_aY%2fs1600%2ffacebook-iOS-icon.png&ehk=BuqxeNZJaZRBVpO%2fxgkZuT8cWrMJYhILEmBh5U8WnaM%3d&risl=&pid=ImgRaw&r=0" alt="" /></a>
<a href="#"><img src={navIcon3} alt="" /></a>
</div> */
}
export default Nav;

{
  /* <Box display="flex" alignItems="center">
<Search>
  <SearchIconWrapper>
    <SearchIcon />
  </SearchIconWrapper>
  <StyledInputBase
    placeholder="Rechercher...."
    inputProps={{ "aria-label": "search" }}
    style={{ color: "#FFFFFF" }}
  />
</Search>
<div className="nav-buttons">
   <NavLink to="/user/login" style={{ textDecoration: "none" }}>
  <button className="hello-btn">Login</button>
</NavLink>
<NavLink to="/user/sign" style={{ textDecoration: "none" }}>
  <button className="hello-btn">Signup</button>
</NavLink>
</div>

</Box> */
}
