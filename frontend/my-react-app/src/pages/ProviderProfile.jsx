import React from "react";
import styled from "styled-components";
import * as S from "../style";
import { useNavigate } from "react-router-dom";
import providers from "./data/providers";
import SwiperComponent from "./SwiperComponent";
import { useParams } from "react-router-dom";
import { Form, Input, Button, DatePicker, TimePicker, Row, Col, Modal } from "antd";
import location from "../assets/location.png";
import FormItem from "antd/es/form/FormItem";
import { useRef, useState } from "react";

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
  const serviceId = parseInt(id, 10);
  const service = providers.find((s) => s.id === serviceId);
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [selectedService, setSelectedService] = React.useState(null);
  const navigate = useNavigate();

  if (!service) {
    return <div className="pageBackgroundColor">Service not found.</div>;
  }

  const onFinish = (values) => {
    if (!selectedService) {
      alert("Please select a service before submitting.");
      return;
    }

    console.log("Form Values: ", values);
    console.log("Selected Service: ", selectedService);

    const combinedDateTime = values.date.clone().set({
      hour: values.time.hour(),
      minute: values.time.minute(),
      second: values.time.second(),
    });

    // 예시: 최종 제출 데이터
    const requestData = {
      ...values,
      selectedServiceId: selectedService.id,
      selectedServiceName: selectedService.name,
      selectedServicePrice: selectedService.price,
      datetime: combinedDateTime.format("YYYY-MM-DD HH:mm:ss"),
    };

    console.log("Request Data to Submit:", requestData);
    setIsModalVisible(true);
    form.resetFields();
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed: ", errorInfo);
  };

  const [reviews, setReviews] = useState([
    { id: 1, name: "Alice", rating: 4.5, comment: "Excellent service!" },
    { id: 2, name: "Bob", rating: 3.5, comment: "Pretty good, thanks." },
  ]);
  const [newReview, setNewReview] = useState({
    name: "",
    rating: "",
    comment: "",
  });
  const reviewRef = useRef(null);

  const averageRating = (
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length || 0
  ).toFixed(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.rating || !newReview.comment) return;
    setReviews([...reviews, { ...newReview, id: Date.now() }]);
    setNewReview({ name: "", rating: "", comment: "" });
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
              <img className="photo" src={service.photo1}></img>
            </div>
            {/*2*/}
            <div className="slice">
              <img className="photo" src={service.photo2}></img>
            </div>
            {/*3*/}
            <div className="slice">
              <img className="photo" src={service.photo3}></img>
            </div>
            {/*4*/}
            <div className="slice">
              <img className="photo" src={service.photo4}></img>
            </div>
          </SwiperComponent>
        </div>

        <h2 className="serviceNameRating">
          {service.name}&nbsp;
          <img
            src="/star.png"
            alt="Star Icon"
            className="galleryItemRatingsIcon"
          />
          &nbsp;&nbsp;
          {averageRating}
        </h2>

        <div className="serviceTitleLocationDescription">
          <h3>
            {service.title}
            <br></br>
            <img src={location} height="16px" width="15px"></img>&nbsp;
            {service.location}
          </h3>
          <p>{service.description}</p>
        </div>

        <div className="summary-review">
          <h3>Reviews</h3>
          <br></br>
          <div className="content">
            <h4 style={{ display: "inline" }}>
              <img
                src="/star.png"
                alt="Star Icon"
                className="galleryItemRatingsIcon"
              />{" "}
              {averageRating} / 5.0 <span>&nbsp;&nbsp;&nbsp;</span>"
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
                name="servicetype"
                rules={[
                  { required: true, message: "Please select a service." },
                ]}
                className="serviceRequestHeaders"
              >
                <div>
                  {service.service.map((item) => (
                    <div
                      key={item.id}
                      className="serviceProduct"
                      onClick={() => {
                        setSelectedService(item);
                        form.setFieldsValue({ servicetype: item.name }); // 이거 중요!
                      }}
                      style={{
                        borderColor:
                          selectedService?.id === item.id
                            ? "#1890ff"
                            : "#D3D3D3",
                        cursor: "pointer",
                      }}
                    >
                      <div className="productDescription">
                        <h4>{item.name}</h4>
                        <span className="productPrice">
                          ${item.price} per hour
                        </span>
                        <span className="productDesc">{item.description}</span>
                      </div>
                    </div>
                  ))}
                </div>
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
                {" "}
                {/* Use Row with gutter for spacing */}
                <Col span={12}>
                  {" "}
                  {/* Each Col takes half of the row width (adjust span as needed) */}
                  <Form.Item
                    label="Preferred Date"
                    name="date"
                    rules={[
                      { required: true, message: "Please select a date!" },
                    ]}
                    className="serviceRequestHeaders"
                  >
                    <DatePicker style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Preferred Time"
                    name="time"
                    rules={[
                      { required: true, message: "Please select a time!" },
                    ]}
                    className="serviceRequestHeaders"
                  >
                    <TimePicker style={{ width: "100%" }} format="HH:mm" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item></Form.Item>

              <Form.Item
                style={{
                  display: "flex",
                  justifyContent: "end",
                  marginTop: "-50px",
                }}
              >
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
                  Submit
                </Button>
              </Form.Item>
            </Form>

            <Modal
              title="Success"
              open={isModalVisible}
              onOk={handleOk}
              closable={false}
            >
              <p>Your request has been submitted successfully. Thank you!</p>
            </Modal>
          </div>
        </div>

        <div className="contact">
          <img className="profpic" src={service.profilePic}></img>
          <div className="info">
            <p className="name">{service.name}</p>
            <p className="contacts">Phone: {service.contact}</p>
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
            {averageRating})
          </h3>
          {reviews.map((r) => (
            <div key={r.id} className="review-card">
              <strong>{r.name}</strong> - {r.rating}
              <img
                src="/star.png"
                alt="Star Icon"
                className="galleryItemRatingsIcon"
              />
              <p>{r.comment}</p>
            </div>
          ))}
          <form className="review-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your name"
              value={newReview.name}
              onChange={(e) =>
                setNewReview({ ...newReview, name: e.target.value })
              }
            />
            <input
              type="number"
              step="0.5"
              min="0"
              max="5"
              placeholder="Rating (0~5)"
              value={newReview.rating}
              onChange={(e) =>
                setNewReview({
                  ...newReview,
                  rating: parseFloat(e.target.value),
                })
              }
            />
            <textarea
              placeholder="Your comment"
              value={newReview.comment}
              onChange={(e) =>
                setNewReview({ ...newReview, comment: e.target.value })
              }
            ></textarea>
            <button type="submit">Submit Review</button>
          </form>
        </div>

        <br></br>
      </div>
    </ProfileStyle>
  );
};

export default ProviderProfile;
