import React, { useState, useEffect } from "react";
import { Layout, Menu, Tabs, Card, Button, Typography } from "antd";
import { UserOutlined, MessageOutlined, AppstoreOutlined, ProfileOutlined } from "@ant-design/icons";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const { Sider, Content } = Layout;
const { Title, Text } = Typography;
const { TabPane } = Tabs;

const AccountPage = () => {
  const { setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState("1");
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (!storedRole) {
      navigate("/");
    } else {
      setRole(storedRole);
    }
  }, [navigate]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    navigate("/");
  };

  const menuItems = {
    provider: [
      { key: "1", icon: <UserOutlined />, label: "Profile Settings" },
      { key: "2", icon: <MessageOutlined />, label: "Messages" },
      { key: "3", icon: <AppstoreOutlined />, label: "My Requests" },
      { key: "4", icon: <ProfileOutlined />, label: "My Services" },
    ],
    customer: [
      { key: "1", icon: <UserOutlined />, label: "Profile Settings" },
      { key: "2", icon: <MessageOutlined />, label: "Messages" },
      { key: "3", icon: <ProfileOutlined />, label: "My Bookings" },
    ],
  };

  const renderSider = () => (
    <Sider width={250} theme="light">
      <div style={{ fontSize: "1.5em", fontWeight: "bold", textAlign: "center", margin: "20px 0", color: "#7ac943" }}>
        Event Services
      </div>
      <Menu
        mode="vertical"
        selectedKeys={[selectedKey]}
        onClick={(e) => setSelectedKey(e.key)}
        items={menuItems[role]}
      />
      <Button onClick={handleLogout} type="default" danger style={{ margin: 16 }}>
        Log out
      </Button>
    </Sider>
  );

  const renderProviderContent = () => {
    if (selectedKey === "4") {
      return (
        <>
          <Title level={2}>My Services</Title>
          <Tabs defaultActiveKey="1">
            <TabPane tab="My Listings" key="1">
              <Card
                title="Professional Chef"
                bordered
                style={{ width: "100%", marginBottom: 24 }}
                extra={
                  <>
                    <Button type="primary" style={{ marginRight: 10 }}>
                      Edit
                    </Button>
                    <Button danger>Remove</Button>
                  </>
                }
              >
                <Text strong>Rate:</Text> $60/hr <br />
                <Text strong>Serving:</Text> Wollongong & Surrounding Areas
              </Card>
            </TabPane>
            <TabPane tab="Offers" key="2">
              <Text>No offers yet.</Text>
            </TabPane>
            <TabPane tab="Completed" key="3">
              <Text>No completed services yet.</Text>
            </TabPane>
            <TabPane tab="Subscription" key="4">
              <Text>Subscription details coming soon.</Text>
            </TabPane>
          </Tabs>
        </>
      );
    }
    return <Title level={3}>Coming Soon for Providers...</Title>;
  };

  const renderCustomerContent = () => {
    if (selectedKey === "1") {
      return (
        <>
          <Title level={2}>My Account</Title>
          <Text>Account information here.</Text>
        </>
      );
    }
    if (selectedKey === "2") {
      return (
        <>
          <Title level={2}>Chat messages</Title>
          <Text>Here you can see the messages here.</Text>
        </>
      );
    }
    if (selectedKey === "3") {
      return (
        <>
          <Title level={2}>My Bookings</Title>
          <Text>You currently have no bookings.</Text>
        </>
      );
    }
  };

  if (!role) return null; // Avoid rendering if role not set yet

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {renderSider()}
      <Layout>
        <Content style={{ padding: "24px 40px" }}>
          {role === "provider" && renderProviderContent()}
          {role === "customer" && renderCustomerContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AccountPage;
