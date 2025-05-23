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
    firstname: "",
    lastname: "",
    email: "",
    passwd: "",
    passwdCheck: "",
  });

  const navigateToLogin1 = () => {
    navigate("/login");
  };

  const navigateToLogin2 = () => {
    toast.success(`Sign up complete! ${userData.firstname}`);
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  //save user data for every change in input
  const handleInput = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const { firstname, lastname, email, passwd, passwdCheck } = userData;
  const isSame = passwd === passwdCheck; //check if passwd and passwdCheck is same
  const isValid = firstname !== "" && isSame === true && email !== ""; //check that all values are filled in

  return (
    <S.WholePage>
      <S.StyledWrapper2>
        <form className="form" onChange={handleInput}>
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
              <input type="text" name="firstname" placeholder="Name" required />
              <span></span>
            </div>
            <div className="input-container">
              <p>Last name</p>
              <input type="text" name="lastname" placeholder="Name" required />
              <span></span>
            </div>
            <div className="input-container">
              <p>Email</p>
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                required
              />
              <span></span>
            </div>
            <div className="input-container">
              <p>Password</p>
              <input
                type="password"
                name="passwd"
                placeholder="Enter password"
                required
              />
            </div>
            <div className="input-container">
              <p>Confirm Password</p>
              <input
                type="password"
                name="passwdCheck"
                placeholder="Enter password"
                required
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
