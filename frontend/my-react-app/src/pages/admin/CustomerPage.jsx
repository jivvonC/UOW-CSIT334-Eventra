import React, { useEffect, useState } from "react";
import { Table, Input, Popconfirm, Button, message } from "antd";
import "./CustomerPage.css";

const CustomerPage = () => {
    const [customers, setCustomers] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch("http://localhost:9090/api/users/admin/customers", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log("Fetched users:", data);
                if (data && Array.isArray(data.users)) {
                    setCustomers(data.users);
                } else {
                    message.error(data.message || "Failed to fetch customers");
                    setCustomers([]);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error("Fetch error:", error);
                message.error("Error fetching customers");
                setLoading(false);
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
            setCustomers((prev) => prev.filter((p) => p.id !== record.id));
            message.success(`Deleted provider: ${record.name}`);
            })
            .catch((err) => {
            console.error(err);
            message.error("Failed to delete provider.");
            });
        };

    const filteredCustomers = customers.filter(c => {
        const text = searchText.toLowerCase();
        const fullName = `${c.firstName} ${c.lastName}`.toLowerCase();
        return (
            fullName.includes(text) || c.email.toLowerCase().includes(text)
        );
    });

    const handleBackButtonClicked = () => {
        window.history.back();
    }

    const columns = [
        {
            title: "CLIENT NAME",
            key: "name",
            align: "center",
            sorter: (a, b) => {
                const nameA = `${a.firstName} ${a.lastName}`;
                const nameB = `${b.firstName} ${b.lastName}`;
                return nameA.localeCompare(nameB);
            },
            render: (_, record) => (
                <div className="clientName">
                    {record.firstName} {record.lastName}
                </div>
            ),
            width: 250,
        },
        {
            title: "PHONE NUMBER",
            dataIndex: "phoneNumber",
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
                    title={`Delete ${record.firstName} ${record.lastName}?`}
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
                    rowKey="id"
                    loading={loading}
                    pagination={{ pageSize: 10, position: ["bottomCenter"] }}
                    bordered
                />
            </div>
        </div>
    );
};

export default CustomerPage;
