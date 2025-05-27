import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import * as S from "../style";
import { useNavigate, useParams } from "react-router-dom";
import providers from "./data/providers";
import SwiperComponent from "./SwiperComponent";
import {
  Form,
  Input,
  Button,
  DatePicker,
  TimePicker,
  Row,
  Col,
  Modal,
  Select,
} from "antd";
import location from "../assets/location.png";
import FormItem from "antd/es/form/FormItem";
import moment from "moment";

const ProfileStyle = styled.div`
.hehe {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-item: center;
  width: 800px;
  margin:0 auto;
  text-align: left;
  gap: 5vh;
}

.slicecontainer {
  width: 800px;
  height: 400px;
  margin-top: 20px;
}

.photo {
border-radius: 20px;
width: 800px;
height: 400px;
}

.serviceNameRating {
text-align: left;
width: 800px;
margin:0 auto;
margin-top: -30px;
}

.serviceTitleLocationDescription {
text-align: left;
width: 800px;
margin:0 auto;
margin-top: -50px;
margin-bottom: -30px;
}

.serviceProduct {
display: flex;
flex-direction: row;
width: 800px;
height: 15vh;
margin: 0 auto;
border-radius: 20px;
border-style: solid;
border-width: 0.4px;
border-color: #D3D3D3;
margin-bottom: -10px;
}
.productPic {
border-radius: 20px;
padding: 13.5px;
height: 100px;
width: 190px;
}

.productDescription {
display: flex;
flex-direction: column;
width: 600px;
height: 15vh;
gap: -10px;
margin: -5px;
}

.smalltext {
color: #8c8c8c;
font-size: 15px;
margin-top: -5px;
}

.contact {
display: flex;
flex-direction: row;
width: 800px;
height: 15vh;
margin: 0 auto;
margin-top: -30px;
border-radius: 20px;
border-style: solid;
border-width: 0.4px;
border-color: #D3D3D3;
}

.info {
display: flex;
flex-direction: column;
width: 600px;
height: 15vh;
margin: 1px;

}
.profpic {
border-radius: 100%;
width: 100px;
height: 100px;
margin: 13px;
margin-left: 20px;
margin-right: 20px;
}

.name {
font-weight: 700;
font-size: 20px;
}
.contacts {
margin-top: -10px;
}

.serviceFormContainer {
width: 800px;
}

.serviceRequestContainer {
max-width: 800px; 
}

.serviceProduct {
  display: flex;
  flex-direction: column; /* 이미지가 없으므로 수직 정렬 */
  width: 775px;
  height: 15vh;
  padding: 10px;
  padding-left: 20px;
  border: 1px solid #ddd;
  border-radius: 20px;
  margin-bottom: 15px;
  cursor: pointer;
  background-color: #fff;
  transition: box-shadow 0.2s ease;
}
  .serviceProduct:hover {
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}

.productPic {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 6px;
  flex-shrink: 0;
}

.productDescription {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.productName {
  margin: 0 0 6px 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: #222;
}

.productPrice {
  margin: 0 0 8px 0;
  font-weight: 700;
  color: #0070f3;
  font-size: 1rem;
}

.productDesc {
  margin: 0;
  color: #555;
  font-size: 0.9rem;
  line-height: 1.3;
}

.summary-review {
  height:10vh;
  padding: 20px 23px 20px 20px;
  font-size: 1rem;
  border-radius: 20px;
  border-style: solid;
  border-width: 0.4px;
  border-color: #D3D3D3;
  line-height: 0.1;
}

.see-more-btn {
  display: block;
  width: 100px;
  height: 40px;
  padding-top: 0.35rem;
  padding-bottom: 0.35rem;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  background-color: #ADEA16;
  border: 0;
  border-radius: 1.5rem;
  padding: 0.4rem 0.8rem;
  cursor: pointer;
  font-size: 0.85rem;
  margin-top: 0.5rem;
}

.content {
 display: flex;
 flex-direction: row;
 justify-content: space-between;
}

.review-section {
  margin-top: 2rem;
  padding: 1rem;
  border-top: 1px solid #D3D3D3 ;
}

.review-card {
  border: 1px solid #ddd;
  padding: 0.8rem;
  margin-bottom: 0.6rem;
  border-radius: 4px;
}

.review-form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
}

.review-form input,
.review-form textarea {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.9rem;
}

.review-form button {
  background-color: #ADEA16;
  color: black;
  border: 0;
  border-radius: 1.5rem;
  padding: 0.6rem;
  cursor: pointer;
  font-weight: bold;
}

}`;

const ProviderProfile = () => {
  const { id } = useParams();
  console.log("Current id:", id);
  const navigate = useNavigate();

  const [provider, setProvider] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const [reviews, setReviews] = useState([]); // Initialize reviews
  const [newReview, setNewReview] = useState({
    serviceId: "",
    rating: "",
    comment: "",
  });
  const [selectedService, setSelectedService] = useState(null);

  const reviewRef = useRef(null);

  function extractTime(isoDatetime) {
    const date = new Date(isoDatetime);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  }

  const fetchReviews = async () => {
    try {
      const token = localStorage.getItem("token"); // get auth token if needed
      const response = await fetch(
        `http://localhost:9090/api/reviews/provider/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setReviews(data.reviews || []);
    } catch (error) {
      console.error("Reviews fetch error:", error);
    }
  };

  useEffect(() => {
    const fetchProviderData = async () => {
      try {
        const response = await fetch(
          `http://localhost:9090/api/users/service-providers/${id}`
        );
        if (!response.ok) throw new Error("Failed to fetch provider data");
        const data = await response.json();
        setProvider(data.user);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchServices = async () => {
      try {
        const response = await fetch(
          `http://localhost:9090/api/services/provider/${id}`
        );
        if (!response.ok) throw new Error("Failed to fetch services");
        const data = await response.json();
        setServices(data.services || []);
      } catch (err) {
        console.error("Service fetch error:", err.message);
      }
    };

    fetchProviderData();
    fetchServices();
    fetchReviews();
  }, [id]);

  if (loading) {
    return <div className="provider-profile">Loading...</div>;
  }

  if (error) {
    return <div className="provider-profile error">Error: {error}</div>;
  }

  const service = provider.serviceProviderProfile || {};

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
      : 0;

  const onFinish = async (values) => {
    const serviceId = values.serviceId;
    const selected = services.find((s) => s.id === serviceId);

    if (!selected) {
      alert("Please select a service before submitting.");
      return;
    }

    // Prepare request payload
    const requestData = {
      description: values.description,
      location: values.location,
      preferredDate: values.preferredDate, // if you have these fields
      preferredTime: extractTime(values.preferredTime),
      status: "PENDING",
      service: {
        id: selected.id,
      },
    };

    console.log("Request Data to Submit:", requestData);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:9090/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create booking");
      }

      const result = await response.json();
      console.log("Booking successful:", result);

      alert("Booking submitted successfully and is pending provider approval.");

      // Optional: reset form and state
      form.resetFields();
      setSelectedService(null);
    } catch (error) {
      alert(`Error: ${error.message}`);
      console.error("Booking error:", error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed: ", errorInfo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`http://localhost:9090/api/reviews`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          providerProfileId: id,
          offeredServiceId: newReview.serviceId,
          rating: Number(newReview.rating),
          comment: newReview.comment,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.message.includes("already submitted")) {
          alert("You have already submitted a review for this provider.");
          // Optional: here you could fetch the existing review and prefill the form
        } else {
          throw new Error(errorData.message || "Failed to submit review");
        }
      } else {
        const result = await response.json();
        console.log("Review submitted:", result);
        setNewReview({ rating: "", comment: "", serviceId: "" });
        await fetchReviews();
      }
    } catch (err) {
      console.error("Submit error:", err.message);
    }
  };

  const scrollToReviews = () => {
    reviewRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <ProfileStyle>
      <div className="hehe">
        <div className="slicecontainer">
          <SwiperComponent>
            {/*1*/}
            <div className="slice">
              <img className="photo" src="/cover-photo.jpg" alt="service photo 1" />
            </div>
            {/*2*/}
            <div className="slice">
              <img className="photo" src="/cover-photo.jpg" alt="service photo 2" />

            </div>
          </SwiperComponent>
        </div>

        <h2 className="serviceNameRating" style={{ marginBottom: "10px" }}>
          {provider.serviceProviderProfile.serviceName}&nbsp;
          <img
            src="/star.png"
            alt="Star Icon"
            className="galleryItemRatingsIcon"
          />
          &nbsp;&nbsp;
          {averageRating.toFixed(1)}
        </h2>

        <div className="serviceTitleLocationDescription">
          <h3>
            {service.serviceCategory}
            <br />
            <img
              src={location}
              height="16px"
              width="15px"
              alt="Location Icon"
            />
            &nbsp;
            {service.location}
          </h3>
        </div>

        <div className="summary-review">
          <h3>Reviews</h3>
          <br />
          <div className="content">
            <h4 style={{ display: "inline" }}>
              <img
                src="/star.png"
                alt="Star Icon"
                className="galleryItemRatingsIcon"
              />{" "}
              {averageRating.toFixed(1)} / 5.0 <span>&nbsp;&nbsp;&nbsp;</span>"
              {reviews[0]?.comment}" - {reviews[0]?.name}
            </h4>
            <button onClick={scrollToReviews} className="see-more-btn">
              See more
            </button>
          </div>
        </div>

        <div className="serviceRequestContainer">
          <h3>Request Form</h3>
          <div className="serviceFormContainer">
            <Form
              name="basic"
              form={form}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              layout="vertical"
              style={{ width: "100%" }}
            >
              <Form.Item
                label="Select Service"
                name="serviceId"
                rules={[
                  { required: true, message: "Please select a service." },
                ]}
              >
                <Select
                  placeholder="Select a service"
                  onChange={(value) => {
                    const found = services.find((s) => s.id === value);
                    setSelectedService(found);
                  }}
                >
                  {services.map((item) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.name} - ${item.price}/hr
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Detailed Description"
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Please enter a description of your request!",
                  },
                ]}
                className="serviceRequestHeaders"
              >
                <Input.TextArea rows={4} placeholder="Request description" />
              </Form.Item>

              <Form.Item
                label="Location"
                name="location"
                rules={[
                  { required: true, message: "Please enter a location!" },
                ]}
                className="serviceRequestHeaders"
              >
                <Input placeholder="Your location" />
              </Form.Item>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Preferred Date"
                    name="preferredDate"
                    rules={[
                      { required: true, message: "Please select a date!" },
                    ]}
                    className="serviceRequestHeaders"
                  >
                    <DatePicker
                      style={{ width: "100%" }}
                      disabledDate={(current) =>
                        current && current < moment().startOf("day")
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Preferred Time"
                    name="preferredTime"
                    rules={[
                      { required: true, message: "Please select a time!" },
                    ]}
                    className="serviceRequestHeaders"
                  >
                    <TimePicker style={{ width: "100%" }} format="HH:mm" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    marginTop: "-10px",
                    backgroundColor: "#ADEA16",
                    color: "black",
                    textTransform: "uppercase",
                    borderRadius: "1.5rem",
                    fontSize: "0.7rem",
                    fontWeight: "500",
                    width: "5vw",
                    lineHeight: "1.25rem",
                    border: "0",
                    outline: "0",
                    paddingTop: "0.75rem",
                    paddingBottom: "0.75rem",
                    paddingLeft: "1.25rem",
                    paddingRight: "1.25rem",
                  }}
                >
                  Next
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>

        <div className="contact">
          <img className="profpic" src="/profile.jpg" alt="Profile" />
          <div className="info">
            <p className="name">
              {provider.firstName} {provider.lastName}
            </p>
            <p className="contacts">Phone: {provider.phoneNumber}</p>
            <p className="contacts">Email: {provider.email}</p>
          </div>
        </div>

        <div ref={reviewRef} className="review-section">
          <h3>
            All Reviews (
            <img
              src="/star.png"
              alt="Star Icon"
              className="galleryItemRatingsIcon"
            />
            {reviews.length > 0 ? averageRating.toFixed(1) : "N/A"})
          </h3>

          {reviews.length > 0 ? (
            reviews.map((r) => (
              <div key={r.id} className="review-card">
                <h4>
                  {r.reviewerInfo.firstName} {r.reviewerInfo.lastName}
                </h4>
                <p>Service Name: {r.serviceNameReviewed}</p>
                <p>Rating: {r.rating}</p>
                <div>
                  <p>Comment:</p>
                  <p>{r.comment}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}

          <form className="review-form" onSubmit={handleSubmit}>
            <select
              value={newReview.serviceId}
              onChange={(e) =>
                setNewReview({ ...newReview, serviceId: e.target.value })
              }
              required
            >
              <option value="">Select Service</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              ))}
            </select>

            <input
              type="number"
              min="1"
              max="5"
              placeholder="Rating"
              value={newReview.rating}
              onChange={(e) =>
                setNewReview({ ...newReview, rating: e.target.value })
              }
              required
            />

            <textarea
              placeholder="Comment"
              value={newReview.comment}
              onChange={(e) =>
                setNewReview({ ...newReview, comment: e.target.value })
              }
              required
            />

            <button type="submit">Add Review</button>
          </form>
        </div>
      </div>
    </ProfileStyle>
  );
};

export default ProviderProfile;
