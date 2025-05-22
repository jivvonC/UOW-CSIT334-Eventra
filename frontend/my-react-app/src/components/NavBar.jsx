import { React, useState } from "react";
import { Input, Select } from "antd";
import { useAuth } from "../context/AuthContext";
import "./NavBar.css";
import { Link } from "react-router-dom";

const { Search } = Input;
const { Option } = Select;

const locations = [
  "All Locations",
  "Wollongong",
  "North Wollongong",
  "Keiraville",
  "Gwynneville",
  "Figtree",
  "Coniston",
  "Unanderra",
  "Corrimal",
  "Fairy Meadow",
  "Shellharbour",
  "Kiama",
  "Nowra",
  "Dapto",
  "Albion Park",
  "Port Kembla",
  "Bellambi",
  "Towradgi",
  "Sydney CBD",
  "Parramatta",
  "Bondi",
  "Manly",
  "Chatswood",
  "Penrith",
  "Hornsby",
  "Liverpool",
  "Blacktown",
  "Campbelltown",
  "Ryde",
  "Burwood",
  "Sutherland",
  "Cronulla",
  "St Leonards",
  "North Sydney",
  "Newtown",
  "Redfern",
];

const sortedLocations = [
  "All Locations",
  ...locations.filter((loc) => loc !== "All Locations").sort(),
];

const NavBar = ({ onSearch, selectedLocation, setSelectedLocation }) => {
  const { isLoggedIn } = useAuth();
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
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
              onSearch={(value) => {
                setSearchValue(value);
                onSearch(value);
              }}
              style={{ width: 350 }}
            />

            <Select
              showSearch
              placeholder="Select location"
              optionFilterProp="children"
              style={{ width: 200 }}
              value={selectedLocation}
              onChange={setSelectedLocation}
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
            >
              {sortedLocations.map((loc) => (
                <Option key={loc} value={loc}>
                  {loc}
                </Option>
              ))}
            </Select>
          </div>
        </div>

        <div className="navbar-right">
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="navLinkText">
                Log in
              </Link>
              <Link to="/signupselect" className="navLinkText">
                Sign up
              </Link>
            </>
          ) : (
            <>
              <Link to="/chatbox" className="nav-link">
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
