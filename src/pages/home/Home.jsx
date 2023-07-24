import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
// CSS
import "./Home.css";
// COMPONENTS
import Card from "../../components/card/card";
import { cardData } from "../../Data/CardData";
// ICONS
import iconsinstagam from "../../assets/instagram.png";
import iconslinkedin from "../../assets/linkedin.png";
import nekoButton from "../../assets/Catto2.png";
import nekoButtonHovered from "../../assets/Catto.png";
// AOS
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init({ mirror: false });

function Home() {
  const navigate = useNavigate();

  const [dataImages, setDataImages] = useState([]);
  const [hideDiv, setHideDiv] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const id = localStorage.getItem("id");

  const toggleMenu = () => {
    setShowMenu((prevShowMenu) => !prevShowMenu);
  };

  useEffect(() => {
    document.body.style.overflow = showMenu ? "hidden" : "visible";
  }, [showMenu]);

  useEffect(() => {
    Axios.get(`https://shiroplane-backend.vercel.app/images`).then(
      (response) => {
        setDataImages(response.data.data);
      }
    );
    // console.log(dataImages)

    // Scroll Effect
    const handleScroll = () => {
      // Define the number of pixels when the div should be hidden
      const scrollThreshold = 100; // Change this value as per your requirement

      // Check if the user has scrolled down enough to hide the div
      if (window.pageYOffset > scrollThreshold) {
        setHideDiv(true);
      } else {
        setHideDiv(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Scroll Down */}

      {/* Navigation Menu */}
      <div
        className={`fixed z-10 h-screen w-screen flex flex-col justify-center items-center gap-16 bg-white top-0 text-3xl sm:text-4xl font-normal text-center transition-opacity ${
          showMenu ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <button onClick={() => navigate(`/dashboard/${id}`)}>Dashboard</button>
        <button onClick={() => navigate("/about")}>About Me</button>
        <button onClick={() => navigate("/commission")}>Commission</button>
      </div>

      {/* Neko Button */}
      <button
        disabled={hideDiv}
        className={`fixed z-20 w-20 right-4 top-6  ${
          hideDiv ? "hidden-div-up" : "visible-div-up"
        } ${hovered ? "" : ""}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={toggleMenu}
      >
        {hovered ? (<img className="" src={nekoButtonHovered} alt="" />) : (<img className="" src={nekoButton} alt="" />)}
      </button>

      {/* Link Icon */}
      <div
        className={`container finisher-header w-16 lg:w-16 lg:h-36 h-32 flex flex-col gap-y-2 justify-center fixed transform bottom-32 ${
          hideDiv ? "hidden-div-left" : "visible-div-left"
        }`}
      >
        {/* Social Media Link */}
        <a
          href="https://instagram.com/shiro_plane?igshid=NTc4MTIwNjQ2YQ=="
          target={"_blank"}
          className="border-2 bg-white h-1/2 rounded-e-md flex justify-center items-center "
        >
          {/* Instagram */}
          <img className="w-4/5" src={iconsinstagam} alt="" />
        </a>
        <a
          href="#"
          // target={"_blank"}
          className="border-2 bg-white  h-1/2 rounded-e-md flex justify-center items-center"
        >
          {/* Linkedin */}
          <img className="w-3/5" src={iconslinkedin} alt="" />
        </a>
      </div>
      {/* Content Header */}
      <div className="">
        <div
          data-aos="fade-up"
          className="text-4xl sm:text-5xl xl:text-6xl font-medium text-center mt-32 font-a"
        >
          ShiroPlane Artworks
        </div>
        <div
          data-aos="fade-up"
          className="mx-4 text-lg sm:text-xl xl:text-2xl text-center mt-5 text-slate-600 font-b"
        >
          Passionate illustrator and visual designer, dedicated student at
          university of Pembangunan Jaya, Indonesia
        </div>
        <div className=" border-dashed border-2 flex flex-row gap-x-5 mt-20 justify-center ">
          {/* Caraousel */}
          <div data-aos="fade-up" className="support-grid px-8">
            <section className="grid-1">
              <div className="panel panel-title">
                <h1>Barry’s Cushion</h1>
                <p>A tale of lethargy and soft furnishings</p>
              </div>
              <div className="panel panel-1"></div>
              <div className="panel panel-2"></div>
              <div className="panel panel-3">
                <p>“I should probably get up–things to do.”</p>
              </div>
              <div className="panel panel-4"></div>
              <div className="panel panel-5"></div>
              <div className="panel panel-6"></div>
              <div className="panel panel-7">
                <p>“Naaah.”</p>
              </div>
              <div className="panel panel-8"></div>
              <div className="panel panel-9"></div>
            </section>
          </div>
        </div>
      </div>
      <div className="px-4 md:px-0 mb-48 max-w-6xl flex flex-col justify-center items-center mx-auto">
        <div
          data-aos="fade-up"
          className="text-3xl sm:text-4xl xl:text-5xl font-normal text-center font-a mt-24"
        >
          Gallery
        </div>
        <div
          data-aos="fade-up"
          className="text-md sm:text-lg xl:text-xl text-center my-12 text-slate-600 font-b container max-w-4xl"
        >
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores,
          magni voluptates nemo porro ut veritatis.
        </div>
        <div className="container md:px-6">
          {/* If no images */}
          {dataImages.length === 0 ? (
            <div className="text-center my-36 text-xl font-b">
              no images showed!
            </div>
          ) : (
            // <div className="containerx">
            //   {dataImages.map((card, index) => (
            //     <Card
            //       key={index}
            //       imageSrc={card.imgSrc}
            //       title={card.title}
            //       description={card.desc}
            //     />
            //   ))}
            // </div>
            <div className="containery">
              {dataImages.map((card, index) => (
                <div data-aos="fade-up" key={index} className="box">
                  <img src={card.imgSrc} alt="" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
{
  /* <script src="finisher-header.es5.min.js" type="text/javascript"></script> */
}

export default Home;
