import React, { useState } from "react";
import { Card, Input, Button, Select, message } from "antd";

const { Option } = Select;

const mockProviders = [
  { key: "1", name: "John Peterson", services: ["Plumbing", "Electrical"], location: "Wollongong" },
  { key: "2", name: "Mary Collins", services: ["Cleaning"], location: "Shellharbour" },
];

const PaymentPage = () => {
    const [selectedProvider, setSelectedProvider] = useState(null);
    const [selectedService, setSelectedService] = useState(null);
    const [amount, setAmount] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");

    const handlePayment = () => {
    if (!selectedProvider || !selectedService || !amount || !cardNumber || !expiry || !cvv) {
    message.error("Please complete all fields.");
    return;
    }

    if (cardNumber.length !== 16) {
    message.error("Card number must be exactly 16 digits.");
    return;
    }

    // You can add further validation for expiry format or CVV length if needed

    message.success(`Payment of $${amount} sent to ${selectedProvider.name} for ${selectedService}`);
    setAmount("");
    setCardNumber("");
    setExpiry("");
    setCvv("");
    };

    return (
        <div style={{ padding: 40, maxWidth: 600, margin: "auto" }}>
            <h1>Card Payment</h1>
            <Card title="Payment Information">
                <Input
                    placeholder="Amount (AUD)"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    style={{ marginBottom: 10 }}
                />
                <Input
                    placeholder="Card Number"
                    maxLength={16}
                    value={cardNumber}
                    onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, ""); // remove non-digits
                        setCardNumber(value);
                    }}
                    style={{ marginBottom: 10 }}
                    />
                <Input
                    placeholder="Expiry Date (MM/YY)"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    style={{ marginBottom: 10 }}
                />
                <Input
                    placeholder="CVV"
                    maxLength={3}
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    style={{ marginBottom: 10 }}
                />
                <Button type="primary" block onClick={handlePayment}>
                    Pay Now
                </Button>
            </Card>
        </div>
    );
};

export default PaymentPage;
