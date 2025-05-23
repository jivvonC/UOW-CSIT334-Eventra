//This is the Home Page
import React, { use, useState, useRef, useEffect } from "react";
import { Input, Select } from "antd";
import "./App.css";
import categories from "./pages/data/categories";
import providers from "./pages/data/providers";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const scrollRef = useRef(null);
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

  const allServices = providers;
  const popularServices = allServices.filter((service) => service.rating >= 4.5);
  const cheapRateServices = allServices.filter((service) => service.rate <= 50);

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
