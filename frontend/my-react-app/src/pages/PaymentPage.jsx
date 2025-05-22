import React, { useState } from "react";
import { Card, Input, Button, Select, message } from "antd";

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

    // Simulate payment
    message.success(`Payment of $${amount} sent to ${selectedProvider.name} for ${selectedService}`);
    setAmount("");
    setCardNumber("");
    setExpiry("");
    setCvv("");
  };

  return (
    <div style={{ padding: 40, maxWidth: 600, margin: "auto" }}>
      <h1>Pay Service Provider</h1>

      <Card style={{ marginBottom: 20 }}>
        <label>Choose Service Provider:</label>
        <Select
          style={{ width: "100%" }}
          placeholder="Select Provider"
          onChange={(key) => {
            const provider = mockProviders.find((p) => p.key === key);
            setSelectedProvider(provider);
            setSelectedService(null); // reset selected service
          }}
        >
          {mockProviders.map((provider) => (
            <Option key={provider.key} value={provider.key}>
              {provider.name} - {provider.location}
            </Option>
          ))}
        </Select>

        {selectedProvider && (
          <>
            <label style={{ marginTop: 10 }}>Select Service:</label>
            <Select
              style={{ width: "100%" }}
              placeholder="Select Service"
              onChange={setSelectedService}
              value={selectedService}
            >
              {selectedProvider.services.map((service, index) => (
                <Option key={index} value={service}>
                  {service}
                </Option>
              ))}
            </Select>
          </>
        )}
      </Card>

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
          onChange={(e) => setCardNumber(e.target.value)}
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
