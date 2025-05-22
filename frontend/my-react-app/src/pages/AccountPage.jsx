// src/pages/AccountPage.jsx
import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AccountPage = () => {
  const { setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false); // back to logout status
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <div className="pageBackgroundColor">
      <nav>
        <h1>Account</h1>
        <ul>
          <li>Profile Settings</li>
          <li>Messages</li>
          <li>My Requests</li>
          <li>My Services</li>
        </ul>
        <button onClick={handleLogout} style={{ marginTop: "20px" }}>
          Log out
        </button>
      </nav>
      <div className="accountContent"></div>
    </div>
  );
};

export default AccountPage;
