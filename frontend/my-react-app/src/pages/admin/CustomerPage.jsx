import React, { useEffect, useState } from "react";
import { Table, Input, Popconfirm, Button, message } from "antd";
import "./CustomerPage.css";

const CustomerPage = () => {
    const [customers, setCustomers] = useState([]);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
    const mockCustomers = [
        { key: "1", name: "John Doe", phone: "0412 345 678", email: "john@example.com" },
        { key: "2", name: "Jane Smith", phone: "0433 987 654", email: "jane@example.com" },
        { key: "3", name: "Alice Brown", phone: "0421 555 123", email: "alice@example.com" },
        { key: "4", name: "Michael Green", phone: "0444 222 333", email: "michael@example.com" },
        { key: "5", name: "Emily White", phone: "0455 666 777", email: "emily@example.com" },
        { key: "6", name: "Daniel Black", phone: "0411 234 567", email: "daniel@example.com" },
        { key: "7", name: "Sarah Johnson", phone: "0422 345 678", email: "sarah@example.com" },
        { key: "8", name: "David Lee", phone: "0433 456 789", email: "david@example.com" },
        { key: "9", name: "Olivia Brown", phone: "0444 567 890", email: "olivia@example.com" },
        { key: "10", name: "James Taylor", phone: "0455 678 901", email: "james@example.com" },
        { key: "11", name: "Liam Harris", phone: "0416 789 012", email: "liam@example.com" },
        { key: "12", name: "Ava Martin", phone: "0427 890 123", email: "ava@example.com" },
        { key: "13", name: "Noah Walker", phone: "0438 901 234", email: "noah@example.com" },
        { key: "14", name: "Sophia Hall", phone: "0449 012 345", email: "sophia@example.com" },
        { key: "15", name: "William Allen", phone: "0450 123 456", email: "william@example.com" },
        { key: "16", name: "Isabella Young", phone: "0411 234 890", email: "isabella@example.com" },
        { key: "17", name: "Lucas King", phone: "0422 345 901", email: "lucas@example.com" },
        { key: "18", name: "Mia Wright", phone: "0433 456 012", email: "mia@example.com" },
        { key: "19", name: "Henry Scott", phone: "0444 567 123", email: "henry@example.com" },
        { key: "20", name: "Amelia Adams", phone: "0455 678 234", email: "amelia@example.com" },
    ];
    setCustomers(mockCustomers);
    }, []);

    const handleDelete = (record) => {
    setCustomers((prev) => prev.filter((c) => c.key !== record.key));
    message.success(`Deleted customer: ${record.name}`);
    };

    const filteredCustomers = customers.filter(c => {
    const text = searchText.toLowerCase();
    return (
        c.name.toLowerCase().includes(text) || c.email.toLowerCase().includes(text)
    );
    });

    const handleBackButtonClicked = () => {
        window.history.back();
    }

    const columns = [
    {
        title: "CLIENT NAME",
        dataIndex: "name",
        key: "name",
        align: "center",
        sorter: (a, b) => a.name.localeCompare(b.name),
        render: text => <div className="clientName">{text}</div>,
        width: 250,
    },
    {
        title: "PHONE NUMBER",
        dataIndex: "phone",
        key: "phone",
        align: "center",
        width: 250,
        render: text => <div className="clientPhone">{text}</div>,
    },
    {
        title: "EMAIL",
        dataIndex: "email",
        key: "email",
        align: "center",
        width: 250,
        render: text => <div className="clientEmail">{text}</div>,
    },
    {
        title: "DELETE USER",
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
        width: 100,
    },
    ];

  return (
    <div style={{ padding: 20 }}>
        <Button
            onClick={handleBackButtonClicked}
            className="button"
        >
            Back
        </Button>
        <h1 className="tableTitle">Customer Management</h1>

        <div style={{ marginBottom: "2rem", display: "flex", justifyContent: "flex-end" }}>
        <Input.Search
            placeholder="Search customer name"
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 350 }}
            allowClear
        />
        </div>
        <div className="customer-table" style={{ overflowX: "auto" }}>
            <Table
                className="custom-table"
                columns={columns}
                dataSource={filteredCustomers}
                rowKey="key"
                pagination={{ pageSize: 10, position: ["bottomCenter"] }}
                bordered
            />
        </div>
    </div>
  );
};

export default CustomerPage;
