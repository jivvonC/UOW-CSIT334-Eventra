import React from "react";
import styled from "styled-components";
import * as S from "../style";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import alert from "../assets/alert.png";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwdCheck: "",
    phoneNumber: "",
    role: "CUSTOMER"
  });

  const navigateToLogin1 = () => {
    navigate("/login");
  };

  const navigateToLogin2 = async () => {
  const payload = {
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    password: userData.password,
    phoneNumber: userData.phoneNumber,
    role: userData.role
  };

  try {
  const response = await fetch("http://localhost:9090/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
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

  //save user data for every change in input
  const handleInput = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const { firstName, lastName, email, password, passwdCheck } = userData;
  const isSame = password === passwdCheck; //check if passwd and passwdCheck is same
  const isValid =
  firstName.trim() !== "" &&
  lastName.trim() !== "" &&
  email.trim() !== "" &&
  password.trim() !== "" &&
  passwdCheck.trim() !== "" &&
  isSame; //check that all values are filled in

  return (
    <S.WholePage>
      <S.StyledWrapper2>
        <form className="form">
          <div className="left">
            <div className="signupmsg">
              <h3>
                Already have<br></br> an account?
              </h3>
            </div>

            <div className="signup">
              <button
                type="submit"
                className="signupbtn"
                onClick={(e) => {
                  e.preventDefault(); // ✅ 폼 제출 막기
                  navigateToLogin1(); // ✅ 바로 로그인 페이지 이동
                }}
              >
                Log in
              </button>
            </div>
          </div>

          <div className="right">
            <p className="form-title">Sign Up</p>
            <div className="input-container">
              <p>First name</p>
              <input type="text" name="firstName" placeholder="Name" required value={userData.firstName} onChange={handleInput} />
              <span></span>
            </div>
            <div className="input-container">
              <p>Last name</p>
              <input type="text" name="lastName" placeholder="Name" required value={userData.lastName} onChange={handleInput} />
              <span></span>
            </div>
            <div className="input-container">
              <p>Email</p>
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                required
                value={userData.email}
                onChange={handleInput}
              />
              <span></span>
            </div>
            <div className="input-container">
              <p>Password</p>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                required
                value={userData.password}
                onChange={handleInput}
              />
            </div>
            
            <div className="input-container">
              <p>Confirm Password</p>
              <input
                type="password"
                name="passwdCheck"
                placeholder="Enter password"
                required
                value={userData.passwdCheck}
                onChange={handleInput}
              />
              &nbsp;&nbsp;
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
            
            <div className="input-container">
              <p>Phone Number</p>
              <input
                type="text"
                name="phoneNumber"
                placeholder="Enter phone number"
                required
                value={userData.phoneNumber}
                onChange={handleInput}
              />
            </div>
            <div className="login">
              <button
                type="submit"
                className="loginbtn"
                disabled={isValid ? false : true}
                onClick={(e) => {
                  e.preventDefault(); // ✅ 폼 제출 막기
                  navigateToLogin2(); // ✅ 토스트 → 2초 후 이동
                }}
              >
                Sign up
              </button>
            </div>
          </div>
        </form>
      </S.StyledWrapper2>
    </S.WholePage>
  );
};

export default SignUp;
