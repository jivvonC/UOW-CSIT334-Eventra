import React, { useState } from "react";
import { Input } from "antd";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import "./NavBar.css";
import { Link } from "react-router-dom";

const { Search } = Input;

const NavBar = ({ onSearch }) => {
  const { isLoggedIn } = useAuth();
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  const handleSearch = async (value) => {
    try {
      setSearchValue(value);
      const response = await axios.get(`http://localhost:9090/api/users/service-providers/search`, {
        params: { name: value }
      });
      console.log("Search results:", response.data);
      onSearch(value); // trigger navigation
    } catch (error) {
      console.error("❌ Search error:", error);
    }
  };

  return (
    <div>
      <header className="navbar">
        <div className="navbar-left">
          <a href="/" className="logo">
            Eventra
          </a>
          <div style={{ display: "flex", gap: "20px" }}>
            <Search
              placeholder="Search services here"
              allowClear
              value={searchValue}
              onChange={handleChange}
              onSearch={handleSearch}
              style={{ width: 350 }}
            />
          </div>
        </div>

        <div className="navbar-right">
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="navLinkText">Log in</Link>
              <Link to="/signupselect" className="navLinkText">Sign up</Link>
            </>
          ) : (
            <>
              <Link to="/chatpage" className="nav-link">
                <img src="chat.png" alt="Chat" className="profile-img" style={{ marginLeft: 20 }} />
              </Link>
              <Link to="/notification" className="nav-link">
                <img src="notification.png" alt="Notification" className="profile-img" />
              </Link>
              <Link to="/account">
                <img src="user.png" alt="Profile" className="profile-img" />
              </Link>
            </>
          )}
        </div>
      </header>
    </div>
  );
};

export default NavBar;
