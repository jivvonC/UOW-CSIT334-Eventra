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

  const [userData, setUserData] = useState({
    serviceName: "",
    abn: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    street: "",
    city: "",
    state: "",
    location: "",
    postcode: "",
    serviceCategory: "",
    email: "",
    password: "",
    passwdCheck: "",
    role: "SERVICE_PROVIDER",
  });

  // Save user data for every change in input
  const handleInput = (e) => {
    const { name, value } = e.target;

    const updatedUserData = {
      ...userData,
      [name]: value,
    };

    if (["street", "city", "state"].includes(name)) {
      const street = name === "street" ? value : userData.street;
      const city = name === "city" ? value : userData.city;
      const state = name === "state" ? value : userData.state;
      updatedUserData.location = `${street}, ${city}, ${state}`;
    }

    setUserData(updatedUserData);
  };

  const navigateToLogin = async () => {
    const normalizeCategory = (category) => category.replace(/\s+/g, '').toUpperCase();
    const payload = {
      serviceName: userData.serviceName,
      abn: userData.abn,
      firstName: userData.firstName,
      lastName: userData.lastName,
      phoneNumber: userData.phoneNumber,
      location: userData.location,
      postcode: userData.postcode,
      serviceCategory: normalizeCategory(userData.serviceCategory),
      email: userData.email,
      password: userData.password,
      role: "SERVICE_PROVIDER",
      profilePictureUrl:
        "https://i.pinimg.com/736x/9f/16/72/9f1672710cba6bcb0dfd93201c6d4c00.jpg",
      coverPhotoUrl:
        "https://jurlique.com.au/cdn/shop/articles/7_WAYS_TO_MAKE_EVERY_DAY_EARTH_DAY_9c2990e0-c893-4d66-9e7a-29b89c8dcf60.jpg?v=1742172049&width=1920",
    };

    try {
      const response = await fetch("http://localhost:9090/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to register");
      }

      toast.success(`Sign up complete! ${userData.firstName}`);
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      toast.error("Sign up failed: " + error.message);
    }
  };

  const {
    serviceName,
    abn,
    firstName,
    lastName,
    phoneNumber,
    street,
    city,
    state,
    location,
    postcode,
    serviceCategory,
    email,
    password,
    passwdCheck,
  } = userData;

  const isSame = password === passwdCheck;
  const isValid = serviceName !== "" && isSame && email !== "";


  return (
    <S.WholePage>
      <S.ProviderSignUp>
        <form className="form">
          <p className="form-title">Sign Up</p>
          <br></br>
          <div className="first">
            <div className="input-container">
              <p>Service Name</p>
              <input
                type="text"
                name="serviceName"
                placeholder="Service Name/Business Name"
                required
                onChange={handleInput}
              />
              <span></span>
            </div>
            <div className="input-container">
              <p>Australian Business Number (ABN)</p>
              <input
                type="text"
                name="abn"
                placeholder="Australian Business Number"
                required
                onChange={handleInput}
              />
              <span></span>
            </div>
            <div className="input-container">
              <p>Director Details</p>
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                required
                onChange={handleInput}
              />
              <span></span>
              <br></br>
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                required
                onChange={handleInput}
              />
              <span></span>
              <br></br>
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                required
                onChange={handleInput}
              />
            </div>
          </div>
          <div className="second">
            <div className="input-container">
              <p>Address</p>
              <input type="text" name="street" placeholder="Street" required value={street} onChange={handleInput} />
              <span></span>
              <br></br>
              <input
                type="text"
                name="city"
                placeholder="City/Suburb"
                required
                onChange={handleInput}
              />
              <span></span>
              <br></br>
              <select className="state" name="state" onChange={handleInput} required>
                <option value="">State</option>
                <option value="NSW">NSW</option>
                <option value="WA">WA</option>
                <option value="SA">SA</option>
                <option value="VIC">VIC</option>
                <option value="ACT">ACT</option>
                <option value="TAS">TAS</option>
                <option value="NT">NT</option>
                <option value="QLD">QLD</option>
              </select>
              <p>Service Category</p>
              <select
                className="servicecategory"
                name="serviceCategory"
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
                onChange={handleInput}
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
                onChange={handleInput}
              />
              <span></span>
              <br></br>
            </div>
            <div className="input-container">
              <p>Password</p>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                required
                onChange={handleInput}
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
                onChange={handleInput}
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
              type="button"
              className="greenbtn"
              disabled={!isValid}
              onClick={(e) => {
                e.preventDefault(); //prevent basic submit action
                navigateToLogin();
              }}
            >
              Register
            </button>
          </div>
        </form>
      </S.ProviderSignUp>
    </S.WholePage>
  );
};

export default ProviderSignUp;
