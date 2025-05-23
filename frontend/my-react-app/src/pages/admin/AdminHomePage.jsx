// src/pages/admin/AdminHomePage.jsx
import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "antd"; 
import { UserOutlined, TeamOutlined } from "@ant-design/icons"; // optional if using Ant Design
import "./AdminHomePage.css";

const AdminHomePage = () => {
    const { setIsLoggedIn } = useAuth();
    const navigate = useNavigate();

    const customerCount = 20;
    const providerCount = 12;

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("role");
        localStorage.removeItem("email");
        navigate("/");
    };

    return (
        <div className="adminDashboard">
            <div className="dashboardTitle">
                <h1>Admin Dashboard</h1>
                <Button
                    onClick={handleLogout}
                    type="default"
                    danger
                    style={{ margin: 16 }}
                >
                    Log out
                </Button>
            </div>
            
            <div className="dashboardCardContainer">
                <div className="dashboardCard">
                    <div className="countCard">
                    <UserOutlined className="cardIcon" />
                    <div className="cardNumber">{customerCount}</div>
                    <div className="cardLabel">Customers</div>
                    </div>
                    <button
                    onClick={() => navigate("/admin/customers")}
                    className="adminButton"
                    >
                    View Customers
                    </button>
                </div>
                <div className="dashboardCard">
                    <div className="countCard">
                    <TeamOutlined className="cardIcon" />
                    <div className="cardNumber">{providerCount}</div>
                    <div className="cardLabel">Service Providers</div>
                    </div>
                    <button
                    onClick={() => navigate("/admin/service-providers")}
                    className="adminButton"
                    >
                    View Service Providers
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminHomePage;
