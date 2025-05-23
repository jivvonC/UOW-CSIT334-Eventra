import React from "react";
import styled from "styled-components";
import * as S from "../style";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import alert from "../assets/alert.png";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import categories from "./data/categories.js";

const ProviderSignUp = () => {
  const navigate = useNavigate();
  const clickNextButton = () => {
    navigate("/payment", {
      state: {
        userData,
        item: "Service Provider Subscription 1 month",
        price: 20,
      },
    });
  };

  const [userData, setUserData] = useState({
    servicename: "",
    abn: "",
    firstname: "",
    lastname: "",
    phonenum: "",
    street: "",
    city: "",
    state: "",
    location: "",
    postcode: "",
    servicecategory: "",
    email: "",
    passwd: "",
    passwdCheck: "",
  });

  //save user data for every change in input
  const handleInput = (e) => {
    const { name, value } = e.target;

    // 변경된 값 반영
    const updatedUserData = {
      ...userData,
      [name]: value,
    };

    // 만약 주소 관련 값이 바뀐 경우, location도 새로 계산
    if (["street", "city", "state"].includes(name)) {
      const street = name === "street" ? value : userData.street;
      const city = name === "city" ? value : userData.city;
      const state = name === "state" ? value : userData.state;
      updatedUserData.location = `${street}, ${city}, ${state}`;
    }

    // 상태 업데이트
    setUserData(updatedUserData);
  };

  const {
    servicename,
    abn,
    firstname,
    lastname,
    phonenum,
    street,
    city,
    state,
    location,
    postcode,
    servicecategory,
    email,
    passwd,
    passwdCheck,
  } = userData;
  const isSame = passwd === passwdCheck; //check if passwd and passwdCheck is same
  const isValid = servicename !== "" && isSame === true && email !== ""; //check that all values are filled in

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
                name="abn"
                placeholder="Australian Business Number"
                required
              />
              <span></span>
            </div>
            <div className="input-container">
              <p>Director Details</p>
              <input
                type="text"
                name="firstname"
                placeholder="First name"
                required
              />
              <span></span>
              <br></br>
              <input
                type="text"
                name="lastname"
                placeholder="Last name"
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
                value={servicecategory}
                onChange={handleInput}
                required
              >
                <option value="">Select a category</option>
                {categories
                  .filter((cat) => cat.name !== "All Services")
                  .map((cat) => (
                    <option key={cat.name} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
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
              <p>Email</p>
              <input
                type="email"
                name="email"
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
              onClick={(e) => {
                e.preventDefault(); //prevent basic submit action
                clickNextButton();
              }}
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
