import React, { useState } from "react";
import styled from "styled-components";
import * as S from "../style";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
// import { message } from "antd";  // REMOVE this import
import { toast } from "react-toastify";

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

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:9090/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password.trim(),
        }),
      });

      const data = await response.json();
      console.log("Login response data:", data);

      if (response.ok && data.token && data.role) {
        setIsLoggedIn(true);

        // Store non-null data in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("email", email.trim());
        if (data.isActive !== undefined) {
          localStorage.setItem("isActive", data.isActive);
        }
        if (data.expirationTime) {
          localStorage.setItem("expirationTime", data.expirationTime);
        }
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
        }
        // ⭐️ 사용자 정보 따로 요청해서 저장 (account API)
        const accountRes = await fetch(
          "http://localhost:9090/api/users/account",
          {
            headers: {
              Authorization: `Bearer ${data.token}`,
            },
          }
        );
        const accountData = await accountRes.json();
        console.log("⭐️ 사용자 account 정보:", accountData);
       
        if (accountData.user) {
          localStorage.setItem("user", JSON.stringify(accountData.user));
        } else {
          console.warn("⚠️ account API에서 user 정보 없음");
        }

        toast.success(`Welcome back, ${data.role.toLowerCase()}!`);

        if (data.role === "CUSTOMER" || data.role === "SERVICE_PROVIDER") {
          navigate("/account");
        } else if (data.role === "ADMIN") {
          navigate("/admin");
        } else {
          toast.warning("Unrecognized role.");
        }
      } else {
        toast.error(data.message || "Invalid email or password.");
      }
    } catch (err) {
      console.log("Error condition hit");
      // you used `data.message` here, but data won't be defined in catch
      console.error("Login error:", err);
      toast.error("Network error. Please try again.");
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
                Don't have
                <br />
                an account?
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
