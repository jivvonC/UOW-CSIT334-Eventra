import React, { useState, useEffect } from "react";
import { Layout, Menu, Tabs, Card, Button, Typography, Form, Input, InputNumber, Select, Upload, Space, message, Row, Col, Statistic } from "antd";
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
  const [profile, setProfile] = useState(null);
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [bookingError, setBookingError] = useState(null);
  const [providerBookings, setProviderBookings] = useState([]);
  const [loadingProviderBookings, setLoadingProviderBookings] = useState(false);
  const [providerBookingError, setProviderBookingError] = useState(null);
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("1");

  const [newService, setNewService] = useState({
    name: "",
    description: "",
    price: null,
  });

  useEffect(() => {
    if (profile) {
      form.setFieldsValue({
        servicename: profile.serviceProviderProfile?.serviceName || "",
        abn: profile.serviceProviderProfile?.abn || "",
        firstname: profile.firstName || "",
        lastname: profile.lastName || "",
        phonenum: profile.phoneNumber || "",
        location: profile.serviceProviderProfile?.location || "",
        state: profile.serviceProviderProfile?.state || "",
        postcode: profile.serviceProviderProfile?.postcode || "",
        servicecategory: profile.serviceProviderProfile?.serviceCategory || "",
        email: profile.email || "",
      });
    }
  }, [profile, form]);

  const toggleEditing = () => setIsEditing(prev => !prev);
  

  // Fetch services on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:9090/api/services/my-services", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch services");
        return res.json();
      })
      .then((data) => {
        const servicesArray = Array.isArray(data.services) ? data.services : [];
        setServices(servicesArray);
      })
      .catch((err) => console.error("Error fetching services:", err));
  }, []);

  // Add new service
  const handleAddService = () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:9090/api/services/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newService),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to create service");
        return res.json();
      })
      .then(() => {
        setNewService({ name: "", description: "", price: null });
        return fetch("http://localhost:9090/api/services/my-services", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      })
      .then((res) => res.json())
      .then((data) => {
        const servicesArray = Array.isArray(data.services) ? data.services : [];
        setServices(servicesArray);
      })
      .catch((err) => console.error("Error creating service:", err));
  };

  // Update existing service
  const handleUpdateService = () => {
    const token = localStorage.getItem("token");
    if (!token || !editingService) return;

    fetch("http://localhost:9090/api/services/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editingService),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update service");
        return res.json();
      })
      .then(() => {
        setEditingService(null);
        return fetch("http://localhost:9090/api/services/my-services", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      })
      .then((res) => res.json())
      .then((data) => {
        const servicesArray = Array.isArray(data.services) ? data.services : [];
        setServices(servicesArray);
      })
      .catch((err) => console.error("Error updating service:", err));
  };

  // Delete service
  const handleDeleteService = (id) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch(`http://localhost:9090/api/services/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete service");
        // Update UI after deletion
        setServices((prev) => prev.filter((s) => s.id !== id));
      })
      .catch((err) => console.error("Error deleting service:", err));
  };

  //Access bookings (SERVICE_PROVIDER)
  useEffect(() => {
    if (role !== 'service_provider' || selectedKey !== '2') return;

    const token = localStorage.getItem("token");
    if (!token) return;

    setLoadingProviderBookings(true);
    fetch("http://localhost:9090/api/bookings/my-bookings/provider", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch provider bookings");
        return res.json();
      })
      .then((data) => {
        console.log("Provider Bookings Data:", data);
        setProviderBookings(data.bookings || []);
        setProviderBookingError(null);
      })
      .catch((err) => setProviderBookingError(err.message))
      .finally(() => setLoadingProviderBookings(false));
  }, [role, selectedKey]);

  //Access Bookings (CUSTOMER)
  useEffect(() => {
    if (selectedKey === "2") {
      const token = localStorage.getItem("token");
      if (!token) return;

      setLoadingBookings(true);
      fetch("http://localhost:9090/api/bookings/my-bookings/customer", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch bookings");
          }
          return res.json();
        })
        .then((data) => {
          console.log("Customer Bookings Data:", data);
          setBookings(data.bookings || []);
          setBookingError(null);
        })
        .catch((err) => {
          console.error(err);
          setBookingError("Could not load your bookings.");
        })
        .finally(() => {
          setLoadingBookings(false);
        });
    }
  }, [selectedKey]);


  // Fetch user role on mount
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) setRole(storedRole.toLowerCase());
  }, []);

  // Fetch user profile when role changes
  useEffect(() => {
    if (!role) return;
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:9090/api/users/account", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch profile");
        return res.json();
      })
      .then((data) => {
        setProfile(data.user);
      })
      .catch((err) => console.error(err));
  }, [role]);

  async function acceptBooking(bookingReference) {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await fetch(`http://localhost:9090/api/bookings/${bookingReference}/provider-accept`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to accept booking");
    }

    return await response.json(); // assuming API returns updated booking object
  }
  
  async function updateBookingStatus(bookingReference, status) {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await fetch(`http://localhost:9090/api/bookings/${bookingReference}/status`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      throw new Error("Failed to update booking status");
    }

    return await response.json(); // Updated booking object
  }

  async function updateBookingStatusByEndpoint(bookingReference, status) {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    // Map statuses to your backend endpoints:
    const endpointMap = {
      COMPLETED: "complete",
      ACCEPTED: "provider-accept",
      REJECTED: "provider-reject",
      CANCELLED_BY_CUSTOMER: "customer-cancel",
      CANCELLED_BY_PROVIDER: "provider-cancel",
      CONFIRMED_PAYMENT: "confirm-payment",
      // add others if needed
    };

    const endpoint = endpointMap[status];
    if (!endpoint) throw new Error(`No endpoint for status ${status}`);

    const url = `http://localhost:9090/api/bookings/${bookingReference}/${endpoint}`;

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      // Only send body if endpoint requires it (e.g. provider-cancel might need reason)
      // For now, let's not send a body since your current endpoints don't expect it
    });

    if (!response.ok) {
      throw new Error("Failed to update booking status");
    }

    return await response.json();
  }

  const handleChangeBookingStatus = async (bookingReference, status) => {
    try {
      let updatedBooking;
      if (status === "ACCEPTED_AWAITING_PAYMENT") {
        updatedBooking = await acceptBooking(bookingReference);
      } else {
        updatedBooking = await updateBookingStatusByEndpoint(bookingReference, status);
      }

      setProviderBookings((prev) =>
        prev.map((b) =>
          b.bookingReference === bookingReference ? updatedBooking : b
        )
      );
    } catch (error) {
      alert("Failed to update booking status.");
    }
  };


  //Report Dashboard
  useEffect(() => {
    const token = localStorage.getItem("token"); // Use "token" to be consistent

    if (!token) {
      setError("No auth token found");
      return;
    }

    setLoading(true);
    fetch("http://localhost:9090/api/reports/provider/dashboard-summary", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch dashboard summary");
        return res.json();
      })
      .then((data) => {
        if (data.status === 200) {
          setSummary(data.dashboardSummary);
          setError(null);
        } else {
          setError(data.message || "Unexpected error");
          setSummary(null);
        }
      })
      .catch((err) => {
        setError(err.message);
        setSummary(null);
      })
      .finally(() => setLoading(false));
  }, []);



  // Logout handler
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.clear();
    navigate("/");
  };

  const menuItems = {
    service_provider: [
      { key: "1", icon: <UserOutlined />, label: "Profile Settings" },
      { key: "2", icon: <AppstoreOutlined />, label: "My Requests" },
      { key: "3", icon: <ProfileOutlined />, label: "My Services" },
      { key: "4", icon: <ProfileOutlined />, label: "Analysis Report" },
    ],
    customer: [
      { key: "1", icon: <UserOutlined />, label: "Profile Settings" },
      { key: "2", icon: <ProfileOutlined />, label: "My Bookings" },
    ],
  };

  const onFinish = async (values) => {
    console.log("Updated values:", values);

    const token = localStorage.getItem("token"); // or sessionStorage

    try {
      const response = await fetch("http://localhost:9090/api/users/account", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // Important part
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const data = await response.json();
      console.log("Server response:", data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onTabChange = (key) => {
    setActiveTab(key);

    if (key === "2" && role === "service_provider") {
      const token = localStorage.getItem("token");
      if (!token) return;

      setLoadingProviderBookings(true);
      fetch("http://localhost:9090/api/bookings/my-bookings/provider", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch provider bookings");
          return res.json();
        })
        .then((data) => {
          setProviderBookings(data.bookings || []);
          setProviderBookingError(null);
        })
        .catch((err) => setProviderBookingError(err.message))
        .finally(() => setLoadingProviderBookings(false));
    }
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
        items={menuItems[role] || []}
      />
      <Button onClick={handleLogout} type="default" danger style={{ margin: 16 }}>
        Log out
      </Button>
    </Sider>
  );

  //Service Provider UI
  const renderProviderContent = () => {
    if (selectedKey === "1") {
      return (
        <>
          <Title level={2}>My Account</Title>

          <Form
            form={form}
            name="accountForm"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            style={{ maxWidth: 600, padding: 24 }}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Service Name" name="servicename">
                  <Input disabled={!isEditing} />
                </Form.Item>

                <Form.Item label="First name" name="firstname">
                  <Input disabled={!isEditing} />
                </Form.Item>

                <Form.Item label="Phone Number" name="phonenum">
                  <Input disabled={!isEditing} />
                </Form.Item>

                <Form.Item label="Postcode" name="postcode">
                  <Input disabled={!isEditing} />
                </Form.Item>

                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                  ]}
                >
                  <Input disabled={!isEditing} />
                </Form.Item>
                
                <Form.Item label="ABN" name="abn">
                  <Input disabled={!isEditing} />
                </Form.Item>
              </Col>

              <Col span={12}>


                <Form.Item label="Last name" name="lastname">
                  <Input disabled={!isEditing} />
                </Form.Item>

                <Form.Item label="Location" name="location">
                  <Input disabled={!isEditing} />
                </Form.Item>

                <Form.Item label="Service Category" name="servicecategory">
                  <Select placeholder="Select a category" disabled={!isEditing}>
                    {categories
                      .filter((cat) => cat.name !== "All Services")
                      .map((cat) => (
                        <Option key={cat.name} value={cat.name}>
                          {cat.name}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="profpic"
                  label="Profile Picture"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                >
                  <Upload
                    name="logo"
                    action="/upload.do"
                    listType="picture"
                    disabled={!isEditing}
                  >
                    <Button icon={<UploadOutlined />} disabled={!isEditing}>
                      Click to upload
                    </Button>
                  </Upload>
                </Form.Item>

                <Form.Item
                  name="coverphoto"
                  label="Cover Photo"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                >
                  <Upload
                    name="logo"
                    action="/upload.do"
                    listType="picture"
                    disabled={!isEditing}
                  >
                    <Button icon={<UploadOutlined />} disabled={!isEditing}>
                      Click to upload
                    </Button>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>

           
            {isEditing ? (
              <>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
                <Button onClick={toggleEditing} style={{ marginLeft: 8 }}>
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button onClick={toggleEditing}>Edit Profile</Button>
                <Button onClick={() => navigate("/payment")} style={{ marginLeft: 8 }}>
                  Pay Subscription
                </Button>
              </>
            )}
            
          </Form>
        </>
      );
    }

    if (selectedKey === "2") {
      const filterBookingsByStatus = (status) =>
      providerBookings.filter((b) => b.status === status);

      return (
        <>
          <Title level={2}>Booking Requests</Title>

          {loadingProviderBookings && <p>Loading bookings...</p>}
          {providerBookingError && <p style={{ color: "red" }}>{providerBookingError}</p>}
          {!loadingProviderBookings && providerBookings.length === 0 && <p>No bookings found.</p>}

          <Tabs activeKey={activeTab} onChange={onTabChange}>
            <TabPane tab="New Bookings" key="1"> {/* PENDING */}
              {filterBookingsByStatus("PENDING").map((booking) => (
                <Card
                  key={booking.id}
                  title={`Booking by ${booking.user?.firstName || "Unknown"}`}
                  style={{ marginBottom: 10 }}
                  extra={
                    <>
                      <Button
                        type="primary"
                        onClick={() =>
                          handleChangeBookingStatus(booking.bookingReference, "ACCEPTED_AWAITING_PAYMENT")
                        }
                        style={{ marginRight: 10 }}
                      >
                        Accept
                      </Button>
                      <Button
                        danger
                        onClick={() =>
                          handleChangeBookingStatus(booking.bookingReference, "REJECTED")
                        }
                      >
                        Reject
                      </Button>
                    </>
                  }
                >
                  <p><strong>Service:</strong> {booking.service?.name || "No service name"}</p>
                  <p><strong>Booking Description:</strong> {booking.description}</p>
                  <p><strong>Date:</strong> {booking.preferredDate}</p>
                  <p><strong>Time:</strong> {booking.preferredTime}</p>
                  <p><strong>Status:</strong> {booking.status}</p>
                  <p><strong>Customer Email:</strong> {booking.user?.email || "N/A"}</p>
                  <p><strong>Customer Phone:</strong> {booking.user?.phoneNumber || "N/A"}</p>
                </Card>
              ))}
            </TabPane>

            <TabPane tab="Accepted (Awaiting Payment)" key="2"> {/* ACCEPTED_AWAITING_PAYMENT */}
              {filterBookingsByStatus("ACCEPTED_AWAITING_PAYMENT").map((booking) => (
                <Card
                  key={booking.id}
                  title={`Booking by ${booking.user?.firstName || "Unknown"}`}
                  style={{ marginBottom: 10 }}
                >
                  <p><strong>Service:</strong> {booking.service?.name || "No service name"}</p>
                  <p><strong>Booking Description:</strong> {booking.description}</p>
                  <p><strong>Date:</strong> {booking.preferredDate}</p>
                  <p><strong>Time:</strong> {booking.preferredTime}</p>
                  <p><strong>Status:</strong> {booking.status}</p>
                  <p><strong>Customer Email:</strong> {booking.user?.email || "N/A"}</p>
                  <p><strong>Customer Phone:</strong> {booking.user?.phoneNumber || "N/A"}</p>
                </Card>
              ))}
            </TabPane>

            <TabPane tab="Confirmed" key="3"> {/* CONFIRMED */}
              {filterBookingsByStatus("CONFIRMED").map((booking) => (
                <Card
                  key={booking.id}
                  title={`Booking by ${booking.user?.firstName || "Unknown"}`}
                  style={{ marginBottom: 10 }}
                  extra={
                    <>
                      <Button
                        type="primary"
                        onClick={() =>
                          handleChangeBookingStatus(booking.bookingReference, "COMPLETED")
                        }
                        style={{ marginRight: 10 }}
                      >
                        Mark as Complete
                      </Button>
                    </>
                  }
                >
                  <p><strong>Service:</strong> {booking.service?.name || "No service name"}</p>
                  <p><strong>Booking Description:</strong> {booking.description}</p>
                  <p><strong>Date:</strong> {booking.preferredDate}</p>
                  <p><strong>Time:</strong> {booking.preferredTime}</p>
                  <p><strong>Status:</strong> {booking.status}</p>
                  <p><strong>Customer Email:</strong> {booking.user?.email || "N/A"}</p>
                  <p><strong>Customer Phone:</strong> {booking.user?.phoneNumber || "N/A"}</p>
                </Card>
              ))}
            </TabPane>

            <TabPane tab="Completed" key="4"> {/* COMPLETED */}
              {filterBookingsByStatus("COMPLETED").map((booking) => (
                <Card
                  key={booking.id}
                  title={`Booking by ${booking.user?.firstName || "Unknown"}`}
                  style={{ marginBottom: 10 }}
                  extra={null}
                >
                  <p><strong>Service:</strong> {booking.service?.name || "No service name"}</p>
                  <p><strong>Booking Description:</strong> {booking.description}</p>
                  <p><strong>Date:</strong> {booking.preferredDate}</p>
                  <p><strong>Time:</strong> {booking.preferredTime}</p>
                  <p><strong>Status:</strong> {booking.status}</p>
                  <p><strong>Customer Email:</strong> {booking.user?.email || "N/A"}</p>
                  <p><strong>Customer Phone:</strong> {booking.user?.phoneNumber || "N/A"}</p>
                </Card>
              ))}
            </TabPane>

            <TabPane tab="Rejected" key="5"> {/* COMPLETED */}
              {filterBookingsByStatus("REJECTED").map((booking) => (
                <Card
                  key={booking.id}
                  title={`Booking by ${booking.user?.firstName || "Unknown"}`}
                  style={{ marginBottom: 10 }}
                  extra={null}
                >
                  <p><strong>Service:</strong> {booking.service?.name || "No service name"}</p>
                  <p><strong>Booking Description:</strong> {booking.description}</p>
                  <p><strong>Date:</strong> {booking.preferredDate}</p>
                  <p><strong>Time:</strong> {booking.preferredTime}</p>
                  <p><strong>Status:</strong> {booking.status}</p>
                  <p><strong>Customer Email:</strong> {booking.user?.email || "N/A"}</p>
                  <p><strong>Customer Phone:</strong> {booking.user?.phoneNumber || "N/A"}</p>
                </Card>
              ))}
            </TabPane>
          </Tabs>
        </>
      );
    }

    if (selectedKey === "3") {
      return (
        <>
          <Title level={2}>My services</Title>
          <div>
            {Array.isArray(services) && services.length > 0 ? (
              services.map((service) => (
                <Card
                  key={service.id}
                  title={service.name}
                  style={{ marginBottom: "10px" }}
                >
                  <p>{service.description}</p>
                  {/* Removed location display */}
                  <p>Price: ${service.price}</p>
                  <Button
                    onClick={() => setEditingService(service)}
                    style={{ marginRight: "10px" }}
                  >
                    Edit
                  </Button>
                  <Button danger onClick={() => handleDeleteService(service.id)}>
                    Delete
                  </Button>
                </Card>
              ))
            ) : (
              <p>No services found.</p>
            )}
          </div>

          <div>
            <Form layout="vertical" style={{ marginTop: 24 }}>
              <Form.Item label="Service Name" required>
                <Input
                  value={editingService ? editingService.name : newService.name}
                  onChange={(e) => {
                    const value = e.target.value;
                    editingService
                      ? setEditingService({ ...editingService, name: value })
                      : setNewService({ ...newService, name: value });
                  }}
                />
              </Form.Item>

              <Form.Item label="Description" required>
                <Input
                  value={
                    editingService
                      ? editingService.description
                      : newService.description
                  }
                  onChange={(e) => {
                    const value = e.target.value;
                    editingService
                      ? setEditingService({ ...editingService, description: value })
                      : setNewService({ ...newService, description: value });
                  }}
                />
              </Form.Item>

              {/* Removed location input */}

              <Form.Item label="Price" required>
                <InputNumber
                  style={{ width: "100%" }}
                  value={
                    editingService
                      ? editingService.price ?? 0
                      : newService.price ?? 0
                  }
                  formatter={(value) =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  min={0}
                  onChange={(value) => {
                    const newValue = value === null ? 0 : value;
                    editingService
                      ? setEditingService({ ...editingService, price: newValue })
                      : setNewService({ ...newService, price: newValue });
                  }}
                />
              </Form.Item>

              {editingService ? (
                <Button
                  type="primary"
                  onClick={handleUpdateService}
                  disabled={
                    !editingService.name ||
                    !editingService.description ||
                    editingService.price == null
                  }
                >
                  Update Service
                </Button>
              ) : (
                <Button
                  type="primary"
                  onClick={handleAddService}
                  disabled={
                    !newService.name ||
                    !newService.description ||
                    newService.price == null
                  }
                >
                  Add Service
                </Button>
              )}

              {editingService && (
                <Button
                  style={{ marginLeft: "10px" }}
                  onClick={() => setEditingService(null)}
                >
                  Cancel Edit
                </Button>
              )}
            </Form>
          </div>
        </>
      );
    }

    if (selectedKey === "4") {
      if (loading) return <div>Loading report...</div>;
      if (error) return <div style={{ color: "red" }}>Error: {error}</div>;
      if (!summary) return <div>No data available</div>;
      console.log("Summary data:", summary);
      
      return (
        <div>
          <Title level={2}>Analysis Report for your service</Title>

          <Row gutter={[24, 32]}>
            <Col span={6}>
              <Card variant="borderless">
                <Statistic
                  title="Total bookings"
                  value={summary.totalBookingsLifetime}
                  precision={0}
                  valueStyle={{ color: "#065cfd" }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card variant="borderless">
                <Statistic
                  title="Pending bookings"
                  value={summary.pendingBookings}
                  precision={0}
                  valueStyle={{ color: "#fdd406" }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card variant="borderless">
                <Statistic
                  title="Waiting for payment bookings"
                  value={summary.acceptedAwaitingPaymentBookings}
                  precision={0}
                  valueStyle={{ color: "#fdd406" }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card variant="borderless">
                <Statistic
                  title="Cancelled bookings"
                  value={summary.cancelledBookingsLifetime}
                  precision={0}
                  valueStyle={{ color: "#cf1322" }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card variant="borderless">
                <Statistic
                  title="Confirmed bookings"
                  value={summary.confirmedBookings}
                  precision={0}
                  valueStyle={{ color: "#3f8600" }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card variant="borderless">
                <Statistic
                  title="Completed Bookings in the last 30 Days"
                  value={summary.completedBookingsLast30Days  }
                  precision={0}
                  valueStyle={{ color: "#3f8600" }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card variant="borderless">
                <Statistic
                  title="All Completed Bookings"
                  value={summary.completedBookingsLast30Days  }
                  precision={0}
                  valueStyle={{ color: "#3f8600" }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card variant="borderless">
                <Statistic
                  title="Potential revenue from confirmed"
                  value={summary.potentialRevenueFromConfirmed}
                  precision={0}
                  valueStyle={{ color: "#065cfd" }}
                  suffix="AUD"
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card variant="borderless">
                <Statistic
                  title="Total revenue for the last 30 days"
                  value={summary.totalRevenueFromCompletedLast30Days}
                  precision={0}
                  valueStyle={{ color: "#065cfd" }}
                  suffix="AUD"
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card variant="borderless">
                <Statistic
                  title="Total revenue so far"
                  value={summary.totalRevenueFromCompletedLifetime}
                  precision={0}
                  valueStyle={{ color: "#065cfd" }}
                  suffix="AUD"
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card variant="borderless">
                <Statistic
                  title="Current Average rating"
                  value={summary.currentAverageRating}
                  precision={1}
                  valueStyle={{ color: "#065cfd" }}
                  prefix={
                    <img
                      src="/star.png"
                      alt="Star Icon"
                      className="galleryItemRatingsIcon"
                    />
                  }
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card variant="borderless">
                <Statistic
                  title="Total reviews"
                  value={summary.totalReviews}
                  precision={0}
                  valueStyle={{ color: "#065cfd" }}
                  suffix="reviews"
                />
              </Card>
            </Col>
          </Row>
        </div>
      );
    }
    return null;
  };

    const renderCustomerContent = () => {
    if (selectedKey === "1") {
      return (
        <>
          <Title level={2}>My Account</Title>
          {profile ? (
            <>
              <Text>
                <strong>First Name:</strong> {profile.firstName}
              </Text>
              <br />
              <Text>
                <strong>Last Name:</strong> {profile.lastName}
              </Text>
              <br />
              <Text>
                <strong>Email:</strong> {profile.email}
              </Text>
              <br />
              <Text>
                <strong>Phone Number:</strong> {profile.phoneNumber}
              </Text>
              <br />
            </>
          ) : (
            <Text>Loading profile...</Text>
          )}
        </>
      );
    }
    
    if (selectedKey === "2") {
      return (
        <>
          <Title level={2}>My Bookings</Title>
          {loadingBookings && <Text>Loading bookings...</Text>}
          {bookingError && <Text type="danger">{bookingError}</Text>}
          {!loadingBookings && bookings.length === 0 && (
            <Text>No bookings found.</Text>
          )}
          {bookings.map((booking) => (
            <Card key={booking.id} style={{ marginBottom: "10px" }}>
              <p><strong>Service:</strong> {booking.service?.name || "N/A"}</p>
              <p><strong>Status:</strong> {booking.status}</p>
              <p><strong>Date:</strong> {booking.preferredDate}</p>
              <p><strong>Time:</strong> {booking.preferredTime}</p>

              {/* Example status update buttons */}
              {booking.status === "PENDING" && (
                <Button
                  danger
                  onClick={() => handleChangeBookingStatus(booking.id, "CANCELLED")}
                >
                  Cancel
                </Button>
              )}
              {booking.status === "ACCEPTED_AWAITING_PAYMENT" && (
                <Button
                  type="primary"
                  onClick={() =>
                    navigate("/paymentuser", {
                      state: {
                        requestData: {
                          selectedServiceName: booking.service?.name,
                          selectedServicePrice: booking.service?.price,
                          bookingReference: booking.bookingReference,
                        },
                      },
                    })
                  }
                >
                  Pay Now
                </Button>
              )}
            </Card>
          ))}
        </>
      );
    }

    return null;
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {renderSider()}
      <Layout>
        <Content style={{ margin: "20px", overflow: "auto" }}>
          {role === "service_provider" ? renderProviderContent() : null}
          {role === "customer" ? renderCustomerContent() : null}
          {!role && <Text>Please log in to see your account information.</Text>}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AccountPage;
