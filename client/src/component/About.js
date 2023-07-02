import React, { useEffect, useState } from "react";
import profilepic from "../images/Sarthak.jpeg";
import aboutpic from "../images/aboutpic.png";
import { useNavigate } from "react-router-dom";

const About = () => {

  const [userData, setUserData] = useState({});

  const navigate = useNavigate();

  const callAboutPage = async () => {
    try {
      const res = await fetch("/about", {
        method: "GET",
        headers: {
          Accept: "appllication/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      console.log(data);
      setUserData(data);

      if (!res.ok) {
        const error = new Error(res.error);
        throw error;
      }

    } catch (err) {
      console.log(err);
      navigate("/signin");
    }
  };

  useEffect(() => {
    callAboutPage();
  }, []);


  return (
    <>
      <div className="container emp-profile">
        <form method="GET">
          <div className="row">
            <div className="col-md-4">
              <div className="profile-img">
                <img src={userData.name === "Sarthak Chatterjee" ? profilepic : aboutpic} alt="profilepic" />
              </div>
            </div>

            <div className="col-md-6">
              <div className="profile-head">
                <h5>{ userData.name }</h5>
                <h6>{ userData.work }</h6>
                <p className="profile-rating mt-3 mb-5">
                  RANKINGS: <span>1/10</span>
                </p>

                <ul className="nav nav-tabs" role="tablist">
                  <li className="nav-item" role="presentation">
                    <a
                      className="nav-link active"
                      id="home-tab"
                      data-bs-toggle="tab"
                      href="#home"
                      role="tab"
                      aria-controls="home"
                      aria-selected="true"
                    >
                      About
                    </a>
                  </li>
                  <li className="nav-item" role="presentation">
                    <a
                      className="nav-link"
                      id="profile-tab"
                      data-bs-toggle="tab"
                      href="#profile"
                      role="tab"
                      aria-controls="profile"
                      aria-selected="false"
                    >
                      Timeline
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-md-2">
              <input
                type="submit"
                className="profile-edit-btn"
                name="btnAddMore"
                value="Edit Profile"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <div className="profile-work">
                <p> SOCIAL LINKS </p>
                <a
                  href="https://www.youtube.com/channel/UCXMUHRxPncyuAOvWyLX-N4w"
                  target="_sarthak"
                >
                  YouTube
                </a>
                <br />
                <a
                  href="https://www.linkedin.com/in/sarthak-chatterjee-/"
                  target="_sarthak"
                >
                  Linkedin
                </a>
                <br />
                <a
                  href="https://www.instagram.com/sarthak_chatterjee_/"
                  target="_sarthak"
                >
                  Instagram
                </a>
                <br />
                <a
                  href="https://www.facebook.com/sarthak.chatterjee.1/"
                  target="_sarthak"
                >
                  Facebook
                </a>
                <br />
                <a href="https://github.com/sarthakc20" target="_sarthak">
                  GitHub
                </a>
                <br />
              </div>
            </div>

            <div className="col-md-8 pl-5 about-info">
              <div className="tab-content profile-tab" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <div className="row">
                    <div className="col-md-6">
                      <span>User Id</span>
                    </div>
                    <div className="col-md-6">
                      <p>{ userData._id }</p>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <span>Name</span>
                    </div>
                    <div className="col-md-6">
                      <p>{ userData.name }</p>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <span>Email</span>
                    </div>
                    <div className="col-md-6">
                      <p>{ userData.email }</p>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <span>Phone</span>
                    </div>
                    <div className="col-md-6">
                      <p>{ userData.phone }</p>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <span>Profession</span>
                    </div>
                    <div className="col-md-6">
                      <p>{ userData.work }</p>
                    </div>
                  </div>
                </div>

                <div
                  className="tab-pane fade"
                  id="profile"
                  role="tabpanel"
                  aria-labelledby="profile-tab"
                >
                  <div className="row">
                    <div className="col-md-6">
                      <span>Experience</span>
                    </div>
                    <div className="col-md-6">
                      <p>Expert</p>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <span>Hourly Rate</span>
                    </div>
                    <div className="col-md-6">
                      <p>10$/hr</p>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <span>Total Projects</span>
                    </div>
                    <div className="col-md-6">
                      <p>230</p>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <span>English Level</span>
                    </div>
                    <div className="col-md-6">
                      <p>Expert</p>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <span>Availability</span>
                    </div>
                    <div className="col-md-6">
                      <p>6 months</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default About;
