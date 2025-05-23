// src/pages/admin/AdminHomePage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { UserOutlined, TeamOutlined } from "@ant-design/icons"; // optional if using Ant Design
import "./AdminHomePage.css";

const AdminHomePage = () => {
  const navigate = useNavigate();

  const customerCount = 20;
  const providerCount = 12;

  return (
    <div className="adminDashboard">
        <div className="dashboardTitle">
            <h1>Admin Dashboard</h1>
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
