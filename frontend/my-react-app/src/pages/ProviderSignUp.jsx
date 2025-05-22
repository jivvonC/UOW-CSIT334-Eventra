import React from "react";
import styled from "styled-components";
import * as S from "../style";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import alert from "../assets/alert.png";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const ProviderSignUp = () => {
  const navigate = useNavigate();
  const clickLoginButton = () => {
    navigate("/login");
    toast.success(`Sign up complete! ${username}`);
  };

  const [userData, setUserData] = useState({
    servicename: "",
    abn: "",
    fullname: "",
    phonenum: "",
    email: "",
    street: "",
    city: "",
    state: "",
    postcode: "",
    servicecategory: "",
    username: "",
    passwd: "",
    passwdCheck: "",
  });

  //save user data for every change in input
  const handleInput = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const {
    servicename,
    abn,
    fullname,
    phonenum,
    email,
    street,
    city,
    state,
    postcode,
    servicecategory,
    username,
    passwd,
    passwdCheck,
  } = userData;
  const isSame = passwd === passwdCheck; //check if passwd and passwdCheck is same
  const isValid = servicename !== "" && isSame === true && username !== ""; //check that all values are filled in

  return (
    <S.WholePage>
      <S.ProviderSignUp>
        <form className="form" onChange={handleInput}>
          <p className="form-title">Sign Up</p>
          <br></br>
          <div className="first">
            <div className="input-container">
              <p>Service Name</p>
              <input
                type="text"
                name="servicename"
                placeholder="Service Name/Business Name"
                required
              />
              <span></span>
            </div>
            <div className="input-container">
              <p>ABN</p>
              <input
                type="text"
                name="acn"
                placeholder="Australian Business Number"
                required
              />
              <span></span>
            </div>
            <div className="input-container">
              <p>Director Details</p>
              <input
                type="text"
                name="fullname"
                placeholder="Full Name"
                required
              />
              <span></span>
              <br></br>
              <input
                type="text"
                name="phonenum"
                placeholder="Phone Number"
                required
              />
              <span></span>
              <br></br>
              <input type="email" name="email" placeholder="Email" required />
            </div>
          </div>
          <div className="second">
            <div className="input-container">
              <p>Address</p>
              <input type="text" name="street" placeholder="Street" required />
              <span></span>
              <br></br>
              <input
                type="text"
                name="city"
                placeholder="City/Suburb"
                required
              />
              <span></span>
              <br></br>
              <select className="state" name="state" required>
                <option value="0" selected>
                  State
                </option>
                <option value="nsw">NSW</option>
                <option value="wa">WA</option>
                <option value="sa">SA</option>
                <option value="vic">VIC</option>
                <option value="act">ACT</option>
                <option value="tas">TAS</option>
                <option value="nt">NT</option>
                <option value="qld">QLD</option>
              </select>
              <p>Service Category</p>
              <select
                className="servicecategory"
                name="servicecategory"
                required
              >
                <option value="plumbing">Plumbing</option>
                <option value="electrician">Electrician</option>
                <option value="gardening">Gardening</option>
                <option value="florist">Florist</option>
                <option value="makeup">Make Up</option>
                <option value="hair">Hair Stylist</option>
                <option value="venue">Venue rental</option>
                <option value="moving">Moving</option>
                <option value="photo">Photographer</option>
                <option value="catering">Catering</option>
                <option value="carpenter">Carpenter</option>
                <option value="painter">Painter</option>
                <option value="other">Other</option>
              </select>
              <span></span>
            </div>
            <div className="postcode">
              <input
                type="text"
                name="postcode"
                placeholder="Postcode"
                required
              />
            </div>
          </div>

          <div className="third">
            <div className="input-container">
              <p>Username</p>
              <input
                type="email"
                name="username"
                placeholder="Enter email"
                required
              />
              <span></span>
              <br></br>
            </div>
            <div className="input-container">
              <p>Password</p>
              <input
                type="password"
                name="passwd"
                placeholder="Enter password"
                required
              />
              <br></br>
            </div>
            <div className="input-container">
              <p>Confirm Password</p>
              <input
                type="password"
                name="passwdCheck"
                placeholder="Enter password"
                required
              />
              &nbsp;
              {passwdCheck !== "" && !isSame && (
                <img
                  className="alertImg"
                  src={alert}
                  alt="alert"
                  height="25px"
                  width="25px"
                  title="password not identical"
                />
              )}
            </div>
            <button
              type="submit"
              className="greenbtn"
              onClick={() => clickLoginButton()}
            >
              Next
            </button>
          </div>
        </form>
      </S.ProviderSignUp>
    </S.WholePage>
  );
};

export default ProviderSignUp;
