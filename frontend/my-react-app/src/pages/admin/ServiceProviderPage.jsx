import React, { useEffect, useState } from "react";
import { Table, Input, Modal, Popconfirm, Button, message, Tag } from "antd";
import "./ServiceProviderPage.css";

const ServiceProviderPage = () => {
    const [providers, setProviders] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedServices, setSelectedServices] = useState([]);

    useEffect(() => {
    const mockProviders = [
        { key: "1", name: "John Peterson", phone: "0412 111 222", email: "john.peterson@example.com", location: "Wollongong", services: ["Plumbing", "Electrical"] },
        { key: "2", name: "Mary Collins", phone: "0422 333 444", email: "mary.collins@example.com", location: "Shellharbour", services: ["Cleaning"] },
        { key: "3", name: "James Anderson", phone: "0433 555 666", email: "james.anderson@example.com", location: "Dapto", services: ["Gardening", "Landscaping"] },
        { key: "4", name: "Patricia Garcia", phone: "0444 777 888", email: "patricia.garcia@example.com", location: "Fairy Meadow", services: ["Painting"] },
        { key: "5", name: "Michael Rodriguez", phone: "0455 999 000", email: "michael.rodriguez@example.com", location: "Corrimal", services: ["Carpentry", "Furniture Repair"] },
        { key: "6", name: "Linda Thompson", phone: "0411 222 333", email: "linda.thompson@example.com", location: "Figtree", services: ["House Cleaning", "Window Washing"] },
        { key: "7", name: "Robert Lee", phone: "0422 444 555", email: "robert.lee@example.com", location: "Unanderra", services: ["Electrical", "Home Automation"] },
        { key: "8", name: "Barbara Scott", phone: "0433 666 777", email: "barbara.scott@example.com", location: "Woonona", services: ["Babysitting"] },
        { key: "9", name: "William Clark", phone: "0444 888 999", email: "william.clark@example.com", location: "Port Kembla", services: ["Plumbing"] },
        { key: "10", name: "Jennifer Lewis", phone: "0455 000 111", email: "jennifer.lewis@example.com", location: "Bulli", services: ["Elderly Care", "Meal Prep"] },
        { key: "11", name: "Daniel Wright", phone: "0412 345 678", email: "daniel.wright@example.com", location: "Thirroul", services: ["Painting", "Wallpaper Installation"] },
        { key: "12", name: "Susan Hall", phone: "0423 456 789", email: "susan.hall@example.com", location: "Kiama", services: ["Dog Walking", "Pet Sitting"] },
        { key: "13", name: "Thomas Hill", phone: "0434 567 890", email: "thomas.hill@example.com", location: "Albion Park", services: ["Landscaping", "Irrigation Installation"] },
        { key: "14", name: "Sarah Adams", phone: "0445 678 901", email: "sarah.adams@example.com", location: "Oak Flats", services: ["Home Organization"] },
        { key: "15", name: "Christopher Nelson", phone: "0456 789 012", email: "christopher.nelson@example.com", location: "Mount Ousley", services: ["Furniture Assembly", "TV Mounting"] },
        { key: "16", name: "Nancy Baker", phone: "0413 890 123", email: "nancy.baker@example.com", location: "Lake Illawarra", services: ["Grocery Delivery", "Laundry Services"] },
        { key: "17", name: "Paul Mitchell", phone: "0424 901 234", email: "paul.mitchell@example.com", location: "Towradgi", services: ["Handyman", "Curtain Installation"] },
        { key: "18", name: "Lisa Perez", phone: "0435 012 345", email: "lisa.perez@example.com", location: "Austinmer", services: ["Childcare", "Homework Help"] },
        { key: "19", name: "Mark Campbell", phone: "0446 123 456", email: "mark.campbell@example.com", location: "Warrawong", services: ["Roof Cleaning"] },
        { key: "20", name: "Emily Rivera", phone: "0457 234 567", email: "emily.rivera@example.com", location: "Mangerton", services: ["Interior Design", "Color Consultation"] },
    ];
    setProviders(mockProviders);
    }, []);

    const handleDelete = (record) => {
    setProviders((prev) => prev.filter((p) => p.key !== record.key));
    message.success(`Deleted provider: ${record.name}`);
    };

    const showServices = (services) => {
        setSelectedServices(services || []);
        setModalVisible(true);
    };

    const handleModalClose = () => {
        setModalVisible(false);
        setSelectedServices([]);
    };

    const filteredProviders = providers.filter(p => {
    const text = searchText.toLowerCase();
    return (
        p.name.toLowerCase().includes(text) || 
        p.email.toLowerCase().includes(text) || 
        p.services.some(service => service.toLowerCase().includes(text))
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
        render: text => <div className="providerName">{text}</div>,
        width: "22%",
    },
    {
        title: "PHONE NUMBER",
        dataIndex: "phone",
        key: "phone",
        align: "center",
        width: "18%",
        render: text => <div className="providerPhone">{text}</div>,
    },
    {
        title: "EMAIL",
        dataIndex: "email",
        key: "email",
        align: "center",
        width: "20%",
        render: text => <div className="providerEmail">{text}</div>,
    },
    {
        title: "LOCATION",
        dataIndex: "location",
        key: "location",
        align: "center",
        sorter: (a, b) => a.name.localeCompare(b.name),
        render: text => <div className="providerName">{text}</div>,
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
            <Button onClick={handleBackButtonClicked} className="button">Back</Button>
            <h1 className="tableTitle">Service Provider Management</h1>

            <div style={{ marginBottom: "2rem", display: "flex", justifyContent: "flex-end" }}>
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
                rowKey="key"
                pagination={{ pageSize: 10, position: ["bottomCenter"] }}
                bordered
            />
            </div>
                <Modal
                title={<span className="modalHeading">Services Provided</span>}
                visible={modalVisible}
                onCancel={handleModalClose}
                footer={[
                <Button key="close" onClick={handleModalClose} className="modalButton">
                    Close
                </Button>
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
