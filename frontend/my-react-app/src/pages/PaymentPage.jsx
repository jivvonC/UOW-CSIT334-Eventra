import React, { useState } from "react";
import { Card, Input, Button, Select, message } from "antd";
import "./PaymentPage.css";
import { useLocation, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const { Option } = Select;

const PaymentPage = () => {
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [amount, setAmount] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { userData, item, price } = location.state || {};

  const handlePayment = () => {
    if (!cardNumber || !expiry || !cvv) {
      message.error("Please complete all fields.");
      return;
    }

    if (cardNumber.length !== 16) {
      message.error("Card number must be exactly 16 digits.");
      return;
    }

    const paymentData = {
      userData,
      item,
      price,
      paymentInfo: {
        cardNumber,
        expiry,
        cvv,
      },
    };

    console.log("Final Submit Data:", paymentData);

    toast.success("Payment complete! Your registration is successful.");

    setTimeout(() => {
      navigate("/login");
    }, 1000);

    return (
      <div style={{ padding: 40, maxWidth: 600, margin: "auto" }}>
        <h1>Card Payment</h1>
        <Card title="Payment Information">
          <div className="paymentInfo">
            <p className="item">{item}</p>
            <h3 className="price">${price} AUD</h3>
          </div>
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
          <Button
            className="paybtn"
            type="primary"
            block
            onClick={handlePayment}
          >
            Pay Now
          </Button>
        </Card>
      </div>
    );
  };
};
export default PaymentPage;
