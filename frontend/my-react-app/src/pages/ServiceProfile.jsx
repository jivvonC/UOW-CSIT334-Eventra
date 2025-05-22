import React from 'react';
import "./ServiceProfile.css";
import { useParams } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Form, Input, Button, DatePicker, TimePicker, Row, Col, Modal } from "antd"; 

const allServices = [
    /* Example Data for Popular Services */
    {
      id: 1,
      name: "Mark Zuckerberg",
      title: "Make-up Artist",
      rating: 5.0,
      description:
        "Professional photography services. Delivering high-quality, impactful imagery.",
      rate: "$50/hr",
      contact: "0434123456",
      location: "Wollongong",
      isPopular: "yes",
      profilePic: "/profile.jpg",
      coverPhoto: "/cover-photo.jpg"
    },
    {
      id: 2,
      name: "Mark Zuckerberg",
      title: "Photographer",
      rating: 4.3,
      description:
        "Professional photography services. Delivering high-quality, impactful imagery.",
      rate: "$35/hr",
      contact: "0434123456",
      location: "Keiraville",
      isPopular: "yes",
      profilePic: "/profile.jpg",
      coverPhoto: "/cover-photo.jpg"
    },
    {
      id: 3,
      name: "Mark Zuckerberg",
      title: "Professional DJ",
      rating: 4.1,
      description:
        "Professional photography services. Delivering high-quality, impactful imagery.",
      rate: "$48/hr",
      contact: "0434123456",
      location: "Austinmer",
      isPopular: "yes",
      profilePic: "/profile.jpg",
      coverPhoto: "/cover-photo.jpg"
    },
    {
      id: 4,
      name: "Mark Zuckerberg",
      title: "Tables and Chairs",
      rating: 4.0,
      description:
        "Professional photography services. Delivering high-quality, impactful imagery.",
      rate: "$78/hr",
      contact: "0434123456",
      location: "Coniston",
      isPopular: "yes",
      profilePic: "/profile.jpg",
      coverPhoto: "/cover-photo.jpg"
    },
    {
      id: 5,
      name: "Mark Zuckerberg",
      title: "Photographer",
      rating: 4.9,
      description:
        "Professional photography services. Delivering high-quality, impactful imagery.",
      rate: "$67/hr",
      contact: "0434123456",
      location: "Wollongong",
      isPopular: "yes",
      profilePic: "/profile.jpg",
      coverPhoto: "/cover-photo.jpg"
    },
    {
      id: 6,
      name: "Mark Zuckerberg",
      title: "Hair Stylist",
      rating: 4.8,
      description:
        "Professional photography services. Delivering high-quality, impactful imagery.",
      rate: "$58/hr",
      contact: "0434123456",
      location: "Dapto",
      isPopular: "yes",
      profilePic: "/profile.jpg",
      coverPhoto: "/cover-photo.jpg"
    },
    {
      id: 7,
      name: "Mark Zuckerberg",
      title: "Singer/Musician",
      rating: 4.2,
      description:
        "Professional photography services. Delivering high-quality, impactful imagery.",
      rate: "$31/hr",
      contact: "0434123456",
      location: "North Wollongong",
      isPopular: "yes",
      profilePic: "/profile.jpg",
      coverPhoto: "/cover-photo.jpg"
    },
    {
      id: 8,
      name: "Mark Zuckerberg",
      title: "Emcee",
      rating: 4.4,
      description:
        "Professional photography services. Delivering high-quality, impactful imagery.",
      rate: "$47/hr",
      contact: "0434123456",
      location: "Thirroul",
      isPopular: "yes",
      profilePic: "/profile.jpg",
      coverPhoto: "/cover-photo.jpg"
    },
    {
      id: 9,
      name: "Mark Zuckerberg",
      title: "Make-up Artist",
      rating: 4.5,
      description:
        "Professional photography services. Delivering high-quality, impactful imagery.",
      rate: "$61/hr",
      contact: "0434123456",
      location: "Corrimal",
      isPopular: "yes",
      profilePic: "/profile.jpg",
      coverPhoto: "/cover-photo.jpg"
    },
    {
      id: 10,
      name: "Mark Zuckerberg",
      title: "Make-up Artist",
      rating: 3.2,
      description:
        "Professional photography services. Delivering high-quality, impactful imagery.",
      rate: "$48/hr",
      contact: "0434123456",
      location: "Warrawong",
      isPopular: "no",
      profilePic: "/profile.jpg",
      coverPhoto: "/cover-photo.jpg"
    },
    {
      id: 11,
      name: "Mark Zuckerberg",
      title: "Photographer",
      rating: 3.9,
      description:
        "Professional photography services. Delivering high-quality, impactful imagery.",
      rate: "$51/hr",
      contact: "0434123456",
      location: "Wollongong",
      isPopular: "no",
      profilePic: "/profile.jpg",
      coverPhoto: "/cover-photo.jpg"
    },
    {
      id: 12,
      name: "Mark Zuckerberg",
      title: "Professional DJ",
      rating: 3.2,
      description:
        "Professional photography services. Delivering high-quality, impactful imagery.",
      rate: "$38/hr",
      contact: "0434123456",
      location: "Corrimal",
      isPopular: "no",
      profilePic: "/profile.jpg",
      coverPhoto: "/cover-photo.jpg"
    },
    {
      id: 13,
      name: "Mark Zuckerberg",
      title: "Tables and Chairs",
      rating: 3.9,
      description:
        "Professional photography services. Delivering high-quality, impactful imagery.",
      rate: "$32/hr",
      contact: "0434123456",
      location: "Cringila",
      isPopular: "no",
      profilePic: "/profile.jpg",
      coverPhoto: "/cover-photo.jpg"
    },
    {
      id: 14,
      name: "Mark Zuckerberg",
      title: "Photographer",
      rating: 4.1,
      description:
        "Professional photography services. Delivering high-quality, impactful imagery.",
      rate: "$67/hr",
      contact: "0434123456",
      location: "Wollongong",
      isPopular: "no",
      profilePic: "/profile.jpg",
      coverPhoto: "/cover-photo.jpg"
    },
    {
      id: 15,
      name: "Mark Zuckerberg",
      title: "Hair Stylist",
      rating: 2.2,
      description:
        "Professional photography services. Delivering high-quality, impactful imagery.",
      rate: "$58/hr",
      contact: "0434123456",
      location: "Horsley",
      isPopular: "no",
      profilePic: "/profile.jpg",
      coverPhoto: "/cover-photo.jpg"
    },
    {
      id: 16,
      name: "Mark Zuckerberg",
      title: "Singer/Musician",
      rating: 2.9,
      description:
        "Professional photography services. Delivering high-quality, impactful imagery.",
      rate: "$31/hr",
      contact: "0434123456",
      location: "Wollongong",
      isPopular: "no",
      profilePic: "/profile.jpg",
      coverPhoto: "/cover-photo.jpg"
    },
    {
      id: 17,
      name: "Mark Zuckerberg",
      title: "Emcee",
      rating: 3.7,
      description:
        "Professional photography services. Delivering high-quality, impactful imagery.",
      rate: "$47/hr",
      contact: "0434123456",
      location: "Warrawong",
      isPopular: "no",
      profilePic: "/profile.jpg",
      coverPhoto: "/cover-photo.jpg"
    },
    {
      id: 18,
      name: "Mark Zuckerberg",
      title: "Make-up Artist",
      rating: 3.8,
      description:
        "Professional photography services. Delivering high-quality, impactful imagery.",
      rate: "$61/hr",
      contact: "0434123456",
      location: "West Wollongong",
      isPopular: "no",
      profilePic: "/profile.jpg",
      coverPhoto: "/cover-photo.jpg"
    },
  ];

  const ServiceProfile = () => {
    const { id } = useParams();
    const serviceId = parseInt(id, 10);
    const service = allServices.find((s) => s.id === serviceId);
    const [form] = Form.useForm();  
    const [isModalVisible, setIsModalVisible] = React.useState(false);
  
    if (!service) {
      return <div className="pageBackgroundColor">Service not found.</div>;
    }

    const onFinish = (values) => {
      console.log("Success: ", values);
      setIsModalVisible(true);
      form.resetFields()
      const combinedDateTime = values.date.clone().set({
        hour: values.time.hour(),
        minute: values.time.minute(),
        second: values.time.second(),
      });
      //Handle the form submission
      //E.g. sending the request data to server (backend)
    };

    const handleOk = () => {
      setIsModalVisible(false);
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed: ", errorInfo);
    };
  
    return (
      <div className="pageBackgroundColor">
        <div>
            <button className="backButton" onClick={() => window.history.back()}>
                <ArrowLeftOutlined 
                    style={{ marginRight: "5px" }}
                />
                Back
            </button>
        </div>
        <div className="serviceProfileContainer">
            <div className="profilePictureBorder">
                <img
                    src={service.coverPhoto}
                    alt={`service.title} cover`}
                    className="coverPhoto"
                />
                {service.profilePic && (
                    <div className="profilePictureContainer">
                        <img
                            src={service.profilePic}
                            alt={`${service.title} profile`}
                            className="profilePicture"
                        />
                    </div>
                )}
            </div>

            <div className="serviceDetailsTitle">
                <h1>Provider Details</h1>
            </div>
            
            <div className="serviceDetailsContainer">
              <div className='serviceTopInfo'>
                <div className='serviceNameRating'>
                  <h2 className='serviceName'>{service.name}</h2>
                  <h2 className="serviceRating">
                    Rating: {service.rating}
                    <img
                      src="/star.png"
                      alt="Star Icon"
                      className="galleryItemRatingsIcon"
                    />
                  </h2>
                </div>

                <div className='serviceTitleLocation'>
                  <h2 className='serviceTitle'>Service: {service.title}</h2>
                  <h2 className='serviceLocation'>Location: {service.location}</h2>
                </div>

                <div className='serviceRateContact'>
                  <h2 className='serviceRate'>Rate: {service.rate}</h2>
                  <h2 className='serviceContact'>Contact: {service.contact}</h2>
                </div>
              </div>

              <p className='serviceDescription'>{service.description}</p>
            </div>
            

            <div className="serviceDetailsTitle">
                <h1>Request Form Details</h1>
            </div>

            <div className="serviceRequestContainer">
              <div className="serviceFormContainer">
                <Form
                  name="basic"
                  form={form}
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  layout="vertical"
                  style={{ width: "80%" }}
                >
                  <Form.Item
                    label="Request Name"
                    name="name"
                    rules={[{ required: true, message: "Please enter a request name!" }]}
                    className="serviceRequestHeaders"
                  >
                    <Input placeholder="Request name" />
                  </Form.Item>

                  <Form.Item
                    label="Detailed Description"
                    name="description"
                    rules={[{ required: true, message: "Please enter a description of your request!" }]}
                    className="serviceRequestHeaders"
                  >
                    <Input.TextArea rows={4} placeholder="Request description" />
                  </Form.Item>

                  <Form.Item
                    label="Location"
                    name="location"
                    rules={[{ required: true, message: "Please enter a location!" }]}
                    className="serviceRequestHeaders" 
                  >
                    <Input placeholder="Your location" />
                  </Form.Item>

                  <Row gutter={16}> {/* Use Row with gutter for spacing */}
                    <Col span={12}> {/* Each Col takes half of the row width (adjust span as needed) */}
                      <Form.Item
                        label="Preferred Date"
                        name="date"
                        rules={[{ required: true, message: "Please select a date!" }]}
                        className="serviceRequestHeaders"
                      >
                        <DatePicker style={{ width: '100%' }} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="Preferred Time"
                        name="time"
                        rules={[{ required: true, message: "Please select a time!" }]}
                        className="serviceRequestHeaders"
                      >
                        <TimePicker style={{ width: '100%' }} format="HH:mm" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item>
                    
                  </Form.Item>

                  <Form.Item style={{ display: "flex", justifyContent: "end", marginTop: "-30px" }}>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>

                <Modal
                  title="Success"
                  visible={isModalVisible}
                  onOk={handleOk}
                  closable={false}
                >
                  <p>Your request has been submitted successfully. Thank you!</p>
                </Modal>
              </div>
            </div>
        </div>
      </div>
    );
  };

export default ServiceProfile;