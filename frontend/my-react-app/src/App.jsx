//This is the Home Page
import React, { use, useState, useRef, useEffect } from "react";
import { Input, Select } from "antd";
import "./App.css";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";

const { Search } = Input;
const { Option } = Select;

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const categories = [
    { name: "All Services", icon: "/icons/all.png" },
    { name: "Make-Up Artist", icon: "/icons/makeUpArtist.png" },
    { name: "Hair Stylist", icon: "/icons/hairStylist.png" },
    { name: "Photographer", icon: "/icons/photographer.png" },
    { name: "Event Host", icon: "/icons/hosts.png" },
    { name: "Musician", icon: "/icons/singer.png" },
    { name: "Venue Organiser", icon: "/icons/venueOrganiser.png" },
    { name: "Florist", icon: "/icons/florist.png" },
    { name: "Catering", icon: "/icons/catering.png" },
    { name: "Venue Rental", icon: "/icons/venuerental.png" },
    { name: "Bartender", icon: "/icons/bartender.png" },
    { name: "Mobile Bar", icon: "/icons/mobilebar.png" },
    { name: "Barista", icon: "/icons/barista.png" },
    { name: "Coffee", icon: "/icons/coffee.png" },
    { name: "Ice Cream", icon: "/icons/icecreamVan.png" },
    { name: "Carpenter", icon: "/icons/carpenter.png" },
    { name: "Painter", icon: "/icons/painter.png" },
    { name: "Removalist", icon: "/icons/removalist.png" },
    { name: "Plumber", icon: "/icons/plumber.png" },
    { name: "Cleaner", icon: "/icons/cleaning.png" },
  ];

  const allServices = [
    /* Example Data for Popular Services */

    {
      id: 1,
      title: "Make-up Artist",
      category: "Make-Up Artist",
      rating: 5.0,
      description:
        "Professional photography services. Delivering high-quality, impactful imagery.",
      rate: 50,
      location: "Wollongong",
      coverPhoto: "/cover-photo.jpg",
    },
    {
      id: 2,
      title: "Photographer",
      category: "Photographer",
      rating: 4.3,
      description:
        "Professional photography services. Delivering high-quality, impactful imagery.",
      rate: 35,
      location: "Keiraville",
      coverPhoto: "/cover-photo.jpg",
    },
    {
      id: 3,
      title: "Professional DJ",
      category: "Musician",
      rating: 4.1,
      description:
        "Professional photography services. Delivering high-quality, impactful imagery.",
      rate: 48,
      location: "Austinmer",
      coverPhoto: "/cover-photo.jpg",
    },
    {
      id: 4,
      title: "Tables and Chairs",
      category: "Venue Organiser",
      rating: 4.0,
      description:
        "Professional photography services. Delivering high-quality, impactful imagery.",
      rate: 78,
      location: "Coniston",
      coverPhoto: "/cover-photo.jpg",
    },
    {
      id: 5,
      title: "Photographer",
      category: "Photographer",
      rating: 4.9,
      description:
        "Professional photography services. Delivering high-quality, impactful imagery.",
      rate: 67,
      location: "Wollongong",
      coverPhoto: "/cover-photo.jpg",
    },
    {
      id: 6,
      title: "Hair Stylist",
      category: "Hair Stylist",
      rating: 4.8,
      description:
        "Professional photography services. Delivering high-quality, impactful imagery.",
      rate: 58,
      location: "Dapto",
      coverPhoto: "/cover-photo.jpg",
    },
    {
      id: 7,
      title: "Singer/Musician",
      category: "Musician",
      rating: 4.2,
      description:
        "Professional photography services. Delivering high-quality, impactful imagery.",
      rate: 31,
      location: "North Wollongong",
      coverPhoto: "/cover-photo.jpg",
    },
    {
      id: 8,
      title: "Emcee",
      category: "Event Host",
      rating: 4.4,
      description:
        "Professional photography services. Delivering high-quality, impactful imagery.",
      rate: 47,
      location: "Thirroul",
      coverPhoto: "/cover-photo.jpg",
    },
    {
      id: 9,
      title: "Make-up Artist",
      category: "Make-Up Artist",
      rating: 4.5,
      description:
        "Professional photography services. Delivering high-quality, impactful imagery.",
      rate: 61,
      location: "Corrimal",
      coverPhoto: "/cover-photo.jpg",
    },
    {
      id: 10,
      title: "Make-up Artist",
      category: "Make-Up Artist",
      rating: 3.2,
      description:
        "Professional photography services. Delivering high-quality, impactful imagery.",
      rate: 48,
      location: "Warrawong",
      coverPhoto: "/cover-photo.jpg",
    },
    {
      id: 11,
      title: "Photographer",
      category: "Photographer",
      rating: 4.9,
      description:
        "Professional photography services. Delivering high-quality, impactful imagery.",
      rate: 51,
      location: "Wollongong",
      coverPhoto: "/cover-photo.jpg",
    },
    {
      id: 12,
      title: "Professional DJ",
      category: "Musician",
      rating: 3.2,
      description:
        "Professional photography services. Delivering high-quality, impactful imagery.",
      rate: 38,
      location: "Corrimal",
      coverPhoto: "/cover-photo.jpg",
    },
    {
      id: 13,
      title: "Tables and Chairs",
      category: "Venue Organiser",
      rating: 3.9,
      description:
        "Professional photography services. Delivering high-quality, impactful imagery.",
      rate: 32,
      location: "Cringila",
      coverPhoto: "/cover-photo.jpg",
    },
    {
      id: 14,
      title: "Photographer",
      category: "Photographer",
      rating: 4.7,
      description:
        "Professional photography services. Delivering high-quality, impactful imagery.",
      rate: 67,
      location: "Wollongong",
      coverPhoto: "/cover-photo.jpg",
    },
    {
      id: 15,
      title: "Hair Stylist",
      category: "Hair Stylist",
      rating: 2.2,
      description:
        "Professional photography services. Delivering high-quality, impactful imagery.",
      rate: 58,
      location: "Horsley",
      coverPhoto: "/cover-photo.jpg",
    },
    {
      id: 16,
      title: "Singer/Musician",
      category: "Musician",
      rating: 2.9,
      description:
        "Professional photography services. Delivering high-quality, impactful imagery.",
      rate: 31,
      location: "Wollongong",
      coverPhoto: "/cover-photo.jpg",
    },
    {
      id: 17,
      title: "Emcee",
      category: "Event Host",
      rating: 3.7,
      description:
        "Professional photography services. Delivering high-quality, impactful imagery.",
      rate: 47,
      location: "Warrawong",
      coverPhoto: "/cover-photo.jpg",
    },
    {
      id: 18,
      title: "Make-up Artist",
      category: "Make-Up Artist",
      rating: 4.8,
      description:
        "Professional photography services. Delivering high-quality, impactful imagery.",
      rate: 61,
      location: "West Wollongong",
      coverPhoto: "/cover-photo.jpg",
    },
  ];

  const scrollRef = useRef(null);
  const highestRatedScrollRef = useRef(null);
  const popularServicesScrollRef = useRef(null);
  const cheapRateServicesScrollRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const scrollLeft = (ref) => {
    if (ref.current) {
      ref.current.scrollLeft -= 200;
    }
  };

  const scrollRight = (ref) => {
    if (ref.current) {
      ref.current.scrollLeft += 200;
    }
  };

  const popularServices = allServices.filter(
    (service) => parseFloat(service.rating) >= 4.5
  );

  const cheapRateServices = allServices.filter(
    (service) => parseFloat(service.rate) <= 50
  );

  const goToServicePage = (id) => {
    navigate(`/providerprofile/${id}`);
  };

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    navigate(`/?category=${encodeURIComponent(categoryName)}`);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryFromURL = params.get("category");
    if (categoryFromURL) {
      setSelectedCategory(categoryFromURL);
    }
  }, [location.search]);

  return (
    <div className="pageBackgroundColor">
      <div className="container">
        {/* Categories Bar */}
        <div className="categoriesBar">
          <button
            className="scrollButton left"
            onClick={() => scrollLeft(scrollRef)}
          >
            <ArrowLeftOutlined />
          </button>
          <div className="categoryScroll" ref={scrollRef}>
            {categories.map((category, index) => (
              <div
                key={index}
                className={`categoryCard ${
                  selectedCategory === category.name ? "active" : ""
                }`}
                onClick={() => handleCategoryClick(category.name)}
              >
                <img
                  src={category.icon}
                  alt={category.name}
                  className="categoryIcon"
                />
                <p className="categoryLabel">{category.name}</p>
              </div>
            ))}
          </div>

          <button
            className="scrollButton right"
            onClick={() => scrollRight(scrollRef)}
          >
            <ArrowRightOutlined />
          </button>
        </div>

        {selectedCategory && (
          <div>
            <p className="resultTitle">
              <strong>{selectedCategory}</strong> category:
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                gap: "1rem",
              }}
            >
              {allServices
                .filter((item) => {
                  const matchesCategory =
                    !selectedCategory ||
                    selectedCategory === "All Services" ||
                    item.category === selectedCategory;
                  const matchesLocation =
                    !selectedLocation || item.location === selectedLocation;
                  return matchesCategory && matchesLocation;
                })
                .map((item) => (
                  <div
                    key={item.id}
                    className="galleryItem"
                    onClick={() => goToServicePage(item.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={item.coverPhoto}
                      alt="Cover Photo"
                      className="galleryItemCoverPhoto"
                    />
                    <div className="galleryItemContent">
                      <div className="galleryItemTopRow">
                        <p className="galleryItemTitle">{item.title}</p>
                        <p className="galleryItemRate">${item.rate}/hr</p>
                      </div>
                      <div className="galleryItemBottomRow">
                        <p className="galleryItemRatings">
                          Ratings: {item.rating}
                          <img
                            src="/star.png"
                            alt="Star Icon"
                            className="galleryItemRatingsIcon"
                          />
                        </p>
                        <p className="galleryItemLocation">{item.location}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {!selectedCategory && (
          <>
            {/* Popular Services */}
            <div className="titleWithArrows">
              <h1 className="title">Popular Services</h1>
              <div className="arrowControls">
                <button
                  className="arrowBtn"
                  onClick={() => scrollLeft(popularServicesScrollRef)}
                >
                  <ArrowLeftOutlined />
                </button>
                <button
                  className="arrowBtn"
                  onClick={() => scrollRight(popularServicesScrollRef)}
                >
                  <ArrowRightOutlined />
                </button>
              </div>
            </div>
            <div className="scrollWrapper" ref={popularServicesScrollRef}>
              <div className="gallery">
                {popularServices.map((item) => (
                  <div
                    key={item.id}
                    className="galleryItem"
                    onClick={() => goToServicePage(item.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={item.coverPhoto}
                      alt="Cover Photo"
                      className="galleryItemCoverPhoto"
                    />
                    <div className="galleryItemContent">
                      <div className="galleryItemTopRow">
                        <p className="galleryItemTitle">{item.title}</p>
                        <p className="galleryItemRate">${item.rate}/hr</p>
                      </div>
                      <div className="galleryItemBottomRow">
                        <p className="galleryItemRatings">
                          Ratings: {item.rating}
                          <img
                            src="/star.png"
                            alt="Star Icon"
                            className="galleryItemRatingsIcon"
                          />
                        </p>
                        <p className="galleryItemLocation">{item.location}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cheap Rate Services */}
            {cheapRateServices.length > 0 && (
              <>
                <hr className="solid" />
                <div className="titleWithArrows">
                  <h1 className="title">Cheap Rates</h1>
                  <div className="arrowControls">
                    <button
                      className="arrowBtn"
                      onClick={() => scrollLeft(cheapRateServicesScrollRef)}
                    >
                      <ArrowLeftOutlined />
                    </button>
                    <button
                      className="arrowBtn"
                      onClick={() => scrollRight(cheapRateServicesScrollRef)}
                    >
                      <ArrowRightOutlined />
                    </button>
                  </div>
                </div>
                <div className="scrollWrapper" ref={cheapRateServicesScrollRef}>
                  <div className="gallery">
                    {cheapRateServices.map((item) => (
                      <div
                        key={item.id}
                        className="galleryItem"
                        onClick={() => goToServicePage(item.id)}
                        style={{ cursor: "pointer" }}
                      >
                        <img
                          src={item.coverPhoto}
                          alt="Cover Photo"
                          className="galleryItemCoverPhoto"
                        />
                        <div className="galleryItemContent">
                          <div className="galleryItemTopRow">
                            <p className="galleryItemTitle">{item.title}</p>
                            <p className="galleryItemRate">${item.rate}/hr</p>
                          </div>
                          <div className="galleryItemBottomRow">
                            <p className="galleryItemRatings">
                              Ratings: {item.rating}
                              <img
                                src="/star.png"
                                alt="Star Icon"
                                className="galleryItemRatingsIcon"
                              />
                            </p>
                            <p className="galleryItemLocation">
                              {item.location}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
