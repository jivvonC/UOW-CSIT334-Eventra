import React from "react";
import styled from "styled-components";
import * as S from "../style";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();

  const navigateToSignUpSelect = () => {
    navigate("/signupselect");
  };
  const navigateToForgotPw = () => {
    navigate("/forgotpw");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    /*login logic for later*/

    /*when login success*/
    setIsLoggedIn(true);
    navigate("/");
  };

  return (
    <S.WholePage>
      <S.StyledWrapper>
        <form className="form" onSubmit={handleLogin}>
          <div className="left">
            <p className="form-title">Log in</p>
            <br></br>
            <div className="input-container">
              <input type="email" placeholder="Enter email" />
              <span></span>
            </div>
            <div className="input-container">
              <input type="password" placeholder="Enter password" />
            </div>
            <a
              href="javascript:void(0);"
              className="forgot"
              onClick={navigateToForgotPw}
            >
              Forgot password?
            </a>
            <br></br>
            <br></br>
            <br></br>
            <div className="login">
              <button type="submit" className="loginbtn">
                Log in
              </button>
            </div>
          </div>

          <div className="right">
            <div className="signupmsg">
              <h3>
                Don't have<br></br> an account?
              </h3>
            </div>

            <div className="signup">
              <button
                type="submit"
                className="signupbtn"
                onClick={navigateToSignUpSelect}
              >
                Sign up
              </button>
            </div>
          </div>
        </form>
      </S.StyledWrapper>
    </S.WholePage>
  );
};

export default Login;
