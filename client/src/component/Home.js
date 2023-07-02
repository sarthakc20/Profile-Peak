import React, { useEffect, useState } from "react";
import home1 from "../images/homeimg1.png";
import home2 from "../images/homeimg2.png";
import hello from "../images/hello.png";
import { NavLink } from 'react-router-dom';
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';


const Home = () => {
  const [userName, setUserName] = useState('');
  const [show, setShow] = useState(false);

  const userHomeNAme = async () => {
    try {
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log(data);
      setUserName(data.name);
      setShow(true);

    } catch (err) {
      console.log(err);
    }
  };


  useEffect(() => {
    userHomeNAme();
  }, []);

  return (
    <>
      <div className="home-page">
        <div className="home-div">
          <p className="pt-5">WELCOME</p>
          <h1>{userName}</h1>
          <h2>{ show ? "Happy to see you back!" :"We Are The Devolopers"}</h2>
        </div>
        <div className="homeimg" style={{ display: 'flex', minHeight: '40vh'}}>
      <img
      className="image1"
        src={home1}
        alt="img1"
        style={{
          width: '30%',
          position: 'absolute',
          top: '80%',
          left: '10%',
          transform: 'translateY(-50%)',
        }}
      />
      <img
      className="image2"
        src={ show ? hello : home2}
        alt="img2"
      />
    </div>
      </div>

      <footer className="footer">
      <div className="social-icons">
        <NavLink to="https://www.linkedin.com/in/sarthak-chatterjee-/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="icon" />
        </NavLink>
        <NavLink to="https://github.com/sarthakc20" target="_blank" rel="noopener noreferrer">
          <FaGithub className="icon" />
        </NavLink>
        <NavLink to="https://www.instagram.com/sarthak_chatterjee_/" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="icon" />
        </NavLink>
      </div>
      <p>© 2023 <span>ProfilePeak</span>. All Rights Reserved.</p>
      </footer>
      
    </>
  );
};

export default Home;
