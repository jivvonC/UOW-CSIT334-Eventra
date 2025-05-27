import React, { useEffect, useState } from "react";
import { Table, Input, Modal, Popconfirm, Button, message, Tag } from "antd";
import "./ServiceProviderPage.css";

const ServiceProviderPage = () => {
  const [providers, setProviders] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
        message.error("You must be logged in to view this page.");
        return;
    }

    fetch("http://localhost:9090/api/users/admin/service-providers/all", {
        method: "GET",
        headers: {
        Authorization: `Bearer ${token}`,
        },
    })
        .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch service providers");
        return res.json();
        })
        .then((data) => {
        const transformedProviders = (data.users || []).map((user) => ({
            id: user.id,
            name: `${user.firstName} ${user.lastName}`,
            phone: user.phoneNumber,
            email: user.email,
            location: user.serviceProviderProfile?.location || "N/A",
            services: user.serviceProviderProfile?.serviceName
            ? [user.serviceProviderProfile.serviceName]
            : [],
        }));

        setProviders(transformedProviders);
        })
        .catch((err) => {
        console.error("Error fetching providers:", err);
        message.error("Failed to load service providers.");
        });
    }, []);


  const handleDelete = (record) => {
    const token = localStorage.getItem("token");
    if (!token) {
        message.error("You must be logged in to perform this action.");
        return;
    }

    fetch(`http://localhost:9090/api/users/admin/user/${record.id}`, {
        method: "DELETE",
        headers: {
        Authorization: `Bearer ${token}`,
        },
    })
        .then((res) => {
        if (!res.ok) {
            throw new Error("Failed to delete provider");
        }
        return res.json();
        })
        .then(() => {
        // Update the UI state only if the backend deletion succeeded
        setProviders((prev) => prev.filter((p) => p.id !== record.id));
        message.success(`Deleted provider: ${record.name}`);
        })
        .catch((err) => {
        console.error(err);
        message.error("Failed to delete provider.");
        });
    };


  const showServices = (services) => {
    setSelectedServices(services || []);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedServices([]);
  };

  const filteredProviders = (providers || []).filter((p) => {
    const text = searchText.toLowerCase();
    return (
      p.name.toLowerCase().includes(text) ||
      p.email.toLowerCase().includes(text) ||
      (p.services || []).some((service) =>
        service.toLowerCase().includes(text)
      )
    );
  });

  const handleBackButtonClicked = () => {
    window.history.back();
  };

  const columns = [
    {
      title: "PROVIDER NAME",
      dataIndex: "name",
      key: "name",
      align: "center",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text) => <div className="providerName">{text}</div>,
      width: "22%",
    },
    {
      title: "PHONE NUMBER",
      dataIndex: "phone",
      key: "phone",
      align: "center",
      width: "18%",
      render: (text) => <div className="providerPhone">{text}</div>,
    },
    {
      title: "EMAIL",
      dataIndex: "email",
      key: "email",
      align: "center",
      width: "20%",
      render: (text) => <div className="providerEmail">{text}</div>,
    },
    {
      title: "LOCATION",
      dataIndex: "location",
      key: "location",
      align: "center",
      sorter: (a, b) => a.location.localeCompare(b.location),
      render: (text) => <div className="providerName">{text}</div>,
      width: "18%",
    },
    {
      title: "SERVICES",
      dataIndex: "services",
      key: "services",
      align: "center",
      width: "12%",
      render: (services) => (
        <Button onClick={() => showServices(services)} className="servicesButton">
          Check Services
        </Button>
      ),
    },
    {
      title: "DELETE PROVIDER",
      key: "delete",
      render: (_, record) => (
        <Popconfirm
          title={`Delete ${record.name}?`}
          okText="Delete"
          okType="danger"
          cancelText="Cancel"
          onConfirm={() => handleDelete(record)}
        >
          <Button className="deleteButton">Delete</Button>
        </Popconfirm>
      ),
      align: "center",
      width: "10%",
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <Button onClick={handleBackButtonClicked} className="button">
        Back
      </Button>
      <h1 className="tableTitle">Service Provider Management</h1>

      <div
        style={{ marginBottom: "2rem", display: "flex", justifyContent: "flex-end" }}
      >
        <Input.Search
          placeholder="Search provider name or services"
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 350 }}
          allowClear
        />
      </div>

      <div className="service-provider-table" style={{ overflowX: "auto" }}>
        <Table
          className="custom-table"
          columns={columns}
          dataSource={filteredProviders}
          rowKey="id" // Use 'id' if coming from backend
          pagination={{ pageSize: 10, position: ["bottomCenter"] }}
          bordered
        />
      </div>

      <Modal
        title={<span className="modalHeading">Services Provided</span>}
        open={modalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button key="close" onClick={handleModalClose} className="modalButton">
            Close
          </Button>,
        ]}
      >
        {selectedServices.length > 0 ? (
          selectedServices.map((service) => (
            <Tag color="green" key={service} style={{ marginBottom: 6, fontSize: "16px" }}>
              {service}
            </Tag>
          ))
        ) : (
          <p>No services listed</p>
        )}
      </Modal>
    </div>
  );
};

export default ServiceProviderPage;
