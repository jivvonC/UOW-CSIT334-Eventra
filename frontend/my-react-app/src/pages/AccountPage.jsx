import React, { useState, useEffect } from "react";
import {
  Layout,
  Menu,
  Tabs,
  Card,
  Button,
  Typography,
  Form,
  Checkbox,
  Input,
  Select,
  Upload,
  Space,
  message,
} from "antd";
import {
  UserOutlined,
  MessageOutlined,
  AppstoreOutlined,
  ProfileOutlined,
  UploadOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import categories from "./data/categories.js";

const { Sider, Content } = Layout;
const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

const normFile = (e) => {
  console.log("Upload event:", e);
  if (Array.isArray(e)) {
    return e;
  }
  return e === null || e === void 0 ? void 0 : e.fileList;
};

const AccountPage = () => {
  const { setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState("1");
  const [role, setRole] = useState(null);
  const [editMode, setEditMode] = useState(false);
  //For Service Provider side, My services menu
  const [services, setServices] = useState([
    {
      id: 1,
      name: "Wedding Photography",
      price: "$60 per hour",
      description:
        "Ceremony + Photoshoot. Includes editing of all photos, printing of selected photos, full access to print store.",
      editMode: false,
    },
  ]);

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

  //For Service Provider side, My services menu---Start
  const handleAddService = () => {
    const newService = {
      id: Date.now(), // unique ID
      name: "",
      price: "",
      description: "",
      editMode: true,
    };
    setServices((prev) => [...prev, newService]);
  };

  const handleDelete = (id) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
    message.success("Service deleted");
  };

  const toggleEditMode = (id, mode) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, editMode: mode } : s))
    );
  };

  const handleChange = (id, field, value) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const handleSave = (id) => {
    toggleEditMode(id, false);
    message.success("Service saved");
  };

  const handleCancel = (id) => {
    toggleEditMode(id, false);
  };
  //For Service Provider side, My services menu---Finish

  const menuItems = {
    provider: [
      { key: "1", icon: <UserOutlined />, label: "Profile Settings" },
      { key: "2", icon: <AppstoreOutlined />, label: "My Requests" },
      { key: "3", icon: <ProfileOutlined />, label: "My Services" },
    ],
    customer: [
      { key: "1", icon: <UserOutlined />, label: "Profile Settings" },
      { key: "2", icon: <ProfileOutlined />, label: "My Bookings" },
    ],
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const renderSider = () => (
    <Sider width={250} theme="light">
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
        mode="vertical"
        selectedKeys={[selectedKey]}
        onClick={(e) => setSelectedKey(e.key)}
        items={menuItems[role]}
      />
      <Button
        onClick={handleLogout}
        type="default"
        danger
        style={{ margin: 16 }}
      >
        Log out
      </Button>
    </Sider>
  );

  const renderProviderContent = () => {
    if (selectedKey === "1") {
      return (
        <>
          <Title level={2}>My Account</Title>
          <Form
            name="basic"
            layout="vertical"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 20 }}
            style={{ maxWidth: 600, padding: 24 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item label="Service Name" name="servicename">
              <Input />
            </Form.Item>

            <Form.Item label="ABN" name="abn">
              <Input />
            </Form.Item>

            <Form.Item label="First name" name="firstname">
              <Input />
            </Form.Item>

            <Form.Item label="Last name" name="lastname">
              <Input />
            </Form.Item>

            <Form.Item label="Phone Number" name="phonenum">
              <Input />
            </Form.Item>

            <Form.Item label="Street" name="street">
              <Input />
            </Form.Item>

            <Form.Item label="City/Suburb" name="city">
              <Input />
            </Form.Item>

            <Form.Item label="State" name="state">
              <Select placeholder="State">
                <Option value="nsw">NSW</Option>
                <Option value="wa">WA</Option>
                <Option value="sa">SA</Option>
                <Option value="vic">VIC</Option>
                <Option value="act">ACT</Option>
                <Option value="tas">TAS</Option>
                <Option value="nt">NT</Option>
                <Option value="qld">QLD</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Postcode" name="postcode">
              <Input />
            </Form.Item>

            <Form.Item label="City/Suburb" name="city">
              <Input />
            </Form.Item>

            <Form.Item label="Service Category" name="servicecategory">
              <Select placeholder="Select a category">
                {categories
                  .filter((cat) => cat.name !== "All Services")
                  .map((cat) => (
                    <option key={cat.name} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item name="password" label="Password" hasFeedback>
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="profpic"
              label="Profile Picture"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload name="logo" action="/upload.do" listType="picture">
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>

            <Form.Item
              name="coverphoto"
              label="Cover Photo"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload name="logo" action="/upload.do" listType="picture">
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>

            <Form.Item
              name="photo1"
              label="Photo1"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload name="logo" action="/upload.do" listType="picture">
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>

            <Form.Item
              name="photo2"
              label="Photo2"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload name="logo" action="/upload.do" listType="picture">
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>

            <Form.Item
              name="photo3"
              label="Photo3"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload name="logo" action="/upload.do" listType="picture">
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>

            <Form.Item
              name="photo4"
              label="Photo4"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload name="logo" action="/upload.do" listType="picture">
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>

            <Form.Item label={null}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </>
      );
    }

    if (selectedKey === "2") {
      return (
        <>
          <Title level={2}>Booking Requests</Title>
          <Tabs defaultActiveKey="1">
            <TabPane tab="My Listings" key="1">
              <Card
                title="Professional Chef"
                bordered
                style={{ width: "100%", marginBottom: 24 }}
                extra={<></>}
              >
                <Text strong>Rate:</Text> $60/hr <br />
                <Text strong>Serving:</Text> Wollongong & Surrounding Areas
              </Card>
            </TabPane>
            <TabPane tab="Pending" key="2">
              <Card
                title="Wedding Photography"
                bordered
                style={{ width: "100%", marginBottom: 24 }}
                extra={
                  <>
                    <Button type="primary" style={{ marginRight: 10 }}>
                      Accept
                    </Button>
                    <Button danger>Decline</Button>
                  </>
                }
              >
                <Text strong>Date/Time:</Text> 31/05/25 16:00
                <br />
                <Text strong>Location:</Text> Wollongong
                <br />
                <Text strong>Description:</Text> It's my wedding and I need a
                photographer for my special day.
              </Card>
            </TabPane>
            <TabPane tab="Accepted" key="3">
              <Card
                title="Family Photo"
                bordered
                style={{ width: "100%", marginBottom: 24 }}
                extra={
                  <>
                    <Button type="primary">Complete</Button>
                  </>
                }
              >
                <Text strong>Date/Time:</Text> 31/05/25 16:00
                <br />
                <Text strong>Location:</Text> Kiama
                <br />
                <Text strong>Description:</Text> Family photo for a family of 10
              </Card>
            </TabPane>
            <TabPane tab="Completed" key="4">
              <Card
                title="Birthday Party"
                bordered
                style={{ width: "100%", marginBottom: 24 }}
                extra={<></>}
              >
                <Text strong>Date/Time:</Text> 31/05/25 16:00
                <br />
                <Text strong>Location:</Text> Kiama
                <br />
                <Text strong>Description:</Text> 10 year old boy's Birthday
                party
              </Card>
            </TabPane>
          </Tabs>
        </>
      );
    }

    if (selectedKey === "3") {
      return (
        <>
          <Title level={2}>My services</Title>

          <Space direction="vertical" style={{ width: "100%" }}>
            {services.map((service) => (
              <Card
                key={service.id}
                title={
                  service.editMode ? (
                    <Input
                      value={service.name}
                      onChange={(e) =>
                        handleChange(service.id, "name", e.target.value)
                      }
                    />
                  ) : (
                    service.name
                  )
                }
                bordered
                style={{ width: "100%" }}
                extra={
                  service.editMode ? (
                    <>
                      <Button
                        type="primary"
                        onClick={() => handleSave(service.id)}
                        style={{ marginRight: 10 }}
                      >
                        Save
                      </Button>
                      <Button onClick={() => handleCancel(service.id)}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        type="primary"
                        style={{ marginRight: 10 }}
                        onClick={() => toggleEditMode(service.id, true)}
                      >
                        Edit
                      </Button>
                      <Button danger onClick={() => handleDelete(service.id)}>
                        Delete
                      </Button>
                    </>
                  )
                }
              >
                <Text strong>Name:</Text>{" "}
                {service.editMode ? (
                  <Input
                    value={service.name}
                    onChange={(e) =>
                      handleChange(service.id, "name", e.target.value)
                    }
                  />
                ) : (
                  service.name
                )}
                <br />
                <Text strong>Price:</Text>{" "}
                {service.editMode ? (
                  <Input
                    value={service.price}
                    onChange={(e) =>
                      handleChange(service.id, "price", e.target.value)
                    }
                  />
                ) : (
                  service.price
                )}
                <br />
                <Text strong>Description:</Text>{" "}
                {service.editMode ? (
                  <Input.TextArea
                    rows={3}
                    value={service.description}
                    onChange={(e) =>
                      handleChange(service.id, "description", e.target.value)
                    }
                  />
                ) : (
                  service.description
                )}
              </Card>
            ))}

            <Button
              type="dashed"
              style={{ width: "100%" }}
              icon={<PlusOutlined />}
              onClick={handleAddService}
            >
              Add Service
            </Button>
          </Space>
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
