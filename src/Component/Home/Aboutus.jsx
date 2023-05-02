/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import test0 from "../img/aboutus.png";
import "./Aboutus.css";
function Aboutus() {
  return (
    <div className="about__container">
      <img src={test0} className="about__image" />
      {/* <div className="vertical-line"></div> */}
      <p className="about__text">
        Our platform is the first destination for Tunisian gamers to watch and
        participate in online video game tournaments. We understand the passion
        and dedication that Tunisian gamers bring to the table, and our platform
        is designed to showcase and support their talents. With a focus on
        community engagement, we offer a variety of tournaments for gamers of
        all levels and skill sets. Whether you're looking to participate in a
        competitive tournament or simply watch and enjoy the action, our
        platform has something for everyone. In addition, we offer tools for
        gamers to post their own videos and highlights, enabling them to share
        their skills and connect with other like-minded gamers. So join our
        community today and become part of the growing Tunisian gaming scene!
      </p>
    </div>
  );
}
export default Aboutus;
