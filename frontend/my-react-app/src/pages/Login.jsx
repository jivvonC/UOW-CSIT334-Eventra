import React, { useState } from "react";
import styled from "styled-components";
import * as S from "../style";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { message } from "antd";

const mockUsers = [
  { email: "customer@test.com", password: "12345", role: "customer" },
  { email: "provider@test.com", password: "54321", role: "provider" },
  { email: "admin@test.com", password: "54321", role: "admin" },
];

const Login = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigateToSignUpSelect = () => {
    navigate("/signupselect");
  };

  const navigateToForgotPw = () => {
    navigate("/forgotpw");
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const user = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      setIsLoggedIn(true);
      localStorage.setItem("role", user.role);
      localStorage.setItem("email", user.email);
      message.success(`Welcome back, ${user.role}!`);

      if (user.role === "customer") {
        navigate("/account");
      } else if (user.role === "provider") {
        navigate("/account");
      } else if (user.role === "admin") {
        navigate("/admin");
      }
    } else {
      message.error("Invalid email or password.");
    }
  };

  return (
    <S.WholePage>
      <S.StyledWrapper>
        <form className="form" onSubmit={handleLogin}>
          <div className="left">
            <p className="form-title">Log in</p>
            <br />
            <div className="input-container">
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <span></span>
            </div>
            <div className="input-container">
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="button"
              className="forgot"
              onClick={navigateToForgotPw}
              style={{ background: "none", border: "none", color: "#1890ff", cursor: "pointer", padding: 0 }}
            >
              Forgot password?
            </button>
            <br />
            <br />
            <br />
            <div className="login">
              <button type="submit" className="loginbtn">
                Log in
              </button>
            </div>
          </div>

          <div className="right">
            <div className="signupmsg">
              <h3>
                Don't have<br />an account?
              </h3>
            </div>

            <div className="signup">
              <button
                type="button"
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
