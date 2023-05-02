 import meter1 from "../img/valo.png";
 import meter2 from "../img/assasin.avif";
 import meter3 from "../img/freefire.webp";
 import meter4 from "../img/fortnite.jpg"
import Carousel from 'react-multi-carousel';

import 'react-multi-carousel/lib/styles.css';
// import arrow1 from "../assets/img/arrow1.svg";
// import arrow2 from "../assets/img/arrow2.svg";
// import colorSharp from "../assets/img/color-sharp.png"
import "./slider.css"
 const Slider = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <section className="skill" id="skills">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="skill-bx wow zoomIn">
                        <h2>Games</h2>
                        <p>Those are the most popular games that<br></br> our streamers are enjoy playing</p>
                        <Carousel responsive={responsive} infinite={true} className="owl-carousel owl-theme skill-slider">
                            <div className="item">
                                <img src={meter1} alt="Image" />
                                <h5 className="sub__img">Valorant</h5>
                            </div>
                            <div className="item">
                                <img src={meter2} alt="Image" />
                                <h5 className="sub__img">Assasin Creed</h5>
                            </div>
                            <div className="item">
                                <img src={meter4} alt="Image" />
                                <h5 className="sub__img">Fortnite</h5>
                            </div>
                            <div className="item">
                                <img src={meter3} alt="Image" />
                                <h5 className="sub__img">Free Fire</h5>
                            </div>
                        </Carousel>
                    </div>
                </div>
            </div>
        </div>
        <img className="background-image-left" src="https://postimg.cc/VrY5N5Zh" alt="Image" />
    </section>
  )
}
export default Slider;