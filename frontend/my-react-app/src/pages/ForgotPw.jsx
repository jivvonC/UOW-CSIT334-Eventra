import React from "react";
import styled from "styled-components";
import * as S from "../style";
import { useNavigate } from "react-router-dom";

const ForgotPw = () => {
  const navigate = useNavigate();
  const navigateToLogin = () => {
    navigate("/login");
  };
  return (
    <S.WholePage>
      <S.StyledWrapper>
        <form className="form">
          <div className="left">
            <p className="form-title">Forgot Password?</p>
            <h3>
              Just type your username(email) and name you signed up<br></br>
              and we'll send you the temporary password to your email.
            </h3>
            <br></br>
            <div className="input-container">
              <input type="email" placeholder="Enter email" />
              <span></span>
            </div>
            <div className="input-container">
              <input type="text" placeholder="Enter name" />
            </div>
            <br></br>
            <div className="login">
              <button type="submit" className="loginbtn">
                Send
              </button>
            </div>
          </div>

          <div className="right">
            <div className="signupmsg">
              <h3>Ready to login?</h3>
              <br></br>
              <br></br>
            </div>

            <div className="signup">
              <button
                type="submit"
                className="signupbtn"
                onClick={navigateToLogin}
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </S.StyledWrapper>
    </S.WholePage>
  );
};
export default ForgotPw;
