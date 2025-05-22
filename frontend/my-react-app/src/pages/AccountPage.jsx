// src/pages/AccountPage.jsx
import React, { useState } from "react";
import { Layout, Menu, Tabs, Card, Button, Typography } from "antd";
import {
  UserOutlined,
  MessageOutlined,
  AppstoreOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const { Sider, Content } = Layout;
const { Title, Text } = Typography;

const AccountPage = () => {
  const { setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState("4");

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  const menuItems = [
    { key: "1", icon: <UserOutlined />, label: "Profile Settings" },
    { key: "2", icon: <MessageOutlined />, label: "Messages" },
    { key: "3", icon: <AppstoreOutlined />, label: "My Requests" },
    { key: "4", icon: <ProfileOutlined />, label: "My Services" },
  ];

  const renderMyServices = () => (
    <div style={{ padding: 24 }}>
      <Title level={2}>My Services</Title>
      <Tabs defaultActiveKey='1' type='line' tabBarGutter={30}>
        <Tabs.TabPane tab='My Listings' key='1'>
          <Card
            title='Professional Chef'
            bordered
            style={{ width: "100%", marginBottom: 24 }}
            extra={
              <div>
                <Button type='primary' style={{ marginRight: 10 }}>
                  Edit
                </Button>
                <Button danger>Remove</Button>
              </div>
            }
          >
            <Text strong>Rate:</Text> $60/hr <br />
            <Text strong>Serving:</Text> Wollongong & Surrounding Areas
          </Card>
        </Tabs.TabPane>
        <Tabs.TabPane tab='Offers' key='2'>
          <Text>No offers yet.</Text>
        </Tabs.TabPane>
        <Tabs.TabPane tab='Completed' key='3'>
          <Text>No completed services yet.</Text>
        </Tabs.TabPane>
        <Tabs.TabPane tab='Subscription' key='4'>
          <Text>Subscription details coming soon.</Text>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={250} theme='light'>
        <div
          style={{
            fontSize: "1.5em",
            fontWeight: "bold",
            textAlign: "center",
            margin: "20px 0",
            color: "#7ac943",
          }}
        >
          Event Services
        </div>
        <Menu
          mode='vertical'
          selectedKeys={[selectedKey]}
          onClick={(e) => setSelectedKey(e.key)}
          items={menuItems}
        />
        <Button onClick={handleLogout} type='default' danger style={{ margin: 16 }}>
          Log out
        </Button>
      </Sider>
      <Layout>
        <Content style={{ padding: "24px 40px" }}>
          {selectedKey === "4" && renderMyServices()}
          {/* You can add more views here for other keys */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AccountPage;
