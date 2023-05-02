import * as React from "react";
import "./Footer.css";
import logo from "../../assets/img/logo.png";
import navIcon1 from "../../assets/img/nav-icon1.svg";
import navIcon2 from "../../assets/img/nav-icon2.svg";
import navIcon3 from "../../assets/img/nav-icon3.svg";
function Footer() {
  return (
    <div className="foot">
      <div className="fot">
        <img src={logo} className="logofoot" />
        <div className="footer__content">
          <p className="d1">Home Page</p>
          <p className="d1">Videos</p>
          <p className="d1">Tournaments</p>
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
        {/* <div className='fott'>
   <img src={insta} className='social'></img>
    <img src={youtube} className='social'></img>
    <img src={discord} className='social'></img>
    <img src={facebook} className='social'></img>
   </div> */}
      </div>
    </div>
  );
}
export default Footer;
