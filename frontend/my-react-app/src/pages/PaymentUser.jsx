import React, { useState } from "react";
import { Card, Input, Button, message } from "antd";
import "./PaymentPage.css";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PaymentUser = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { requestData } = location.state || {};

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  if (!requestData || !requestData.bookingReference) {
    return <p>No valid booking reference found. Please go back and select a booking to pay.</p>;
  }

  const handlePayment = async () => {
    console.log("handlePayment called");

    if (!cardNumber || !expiry || !cvv) {
      message.error("Please complete all fields.");
      return;
    }

    console.log("All fields complete");

    if (cardNumber.length !== 16) {
      message.error("Card number must be exactly 16 digits.");
      return;
    }

    const token = localStorage.getItem("token");
    console.log("Token:", token);

    if (!token) {
      toast.error("You are not logged in. Please log in to continue.");
      navigate("/login");
      return;
    }

    const paymentInfo = {
      dummyCardNumber: cardNumber,
      dummyExpiryDate: expiry,
      dummyCvv: cvv,
    };

    try {
      console.log("Sending payment request with:", paymentInfo);
      const response = await fetch(
        `http://localhost:9090/api/payments/booking/${requestData.bookingReference}/simulate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(paymentInfo),
        }
      );

      console.log("Response status:", response.status);

      if (!response.ok) {
        throw new Error("Payment failed");
      }

      toast.success("Payment complete! Your request has been submitted.");

      setTimeout(() => {
        navigate("/account");
      }, 1000);
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment failed. Please try again.");
    }
  };



  return (
    <div style={{ padding: 40, maxWidth: 600, margin: "auto" }}>
      <h1>Card Payment</h1>
      <Card title="Payment Information">
        <div className="paymentInfo">
          <p className="item">{requestData.selectedServiceName}</p>
          <h3 className="price">${requestData.selectedServicePrice} AUD</h3>
        </div>
        <Input
          placeholder="Card Number"
          maxLength={16}
          value={cardNumber}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "");
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
        <Button className="paybtn" type="primary" block onClick={handlePayment}>
          Pay Now
        </Button>
      </Card>
    </div>
  );
};

export default PaymentUser;
