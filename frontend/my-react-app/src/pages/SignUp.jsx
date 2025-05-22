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
  const navigateToLogin = () => {
    navigate("/login");
    toast.success(`Sign up complete! ${username}`);
  };

  const [userData, setUserData] = useState({
    name: "",
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

  const { name, username, passwd, passwdCheck } = userData;
  const isSame = passwd === passwdCheck; //check if passwd and passwdCheck is same
  const isValid = name !== "" && isSame === true && username !== ""; //check that all values are filled in

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
                onClick={navigateToLogin}
              >
                Log in
              </button>
            </div>
          </div>

          <div className="right">
            <p className="form-title">Sign Up</p>
            <div className="input-container">
              <p>Name</p>
              <input type="text" name="name" placeholder="Name" required />
              <span></span>
            </div>
            <div className="input-container">
              <p>Username</p>
              <input
                type="email"
                name="username"
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
            <br></br>
            <br></br>
            <div className="login">
              <button
                type="submit"
                className="loginbtn"
                disabled={isValid ? false : true}
                onClick={() => navigateToLogin()}
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
