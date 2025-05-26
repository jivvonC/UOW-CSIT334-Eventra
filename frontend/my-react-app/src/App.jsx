// This is the Home Page
import React, { useState, useRef, useEffect } from "react";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import categories from "./pages/data/categories";
import "./App.css";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const scrollRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState("All Services");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await fetch("http://localhost:9090/api/users/service-providers");
        const data = await response.json();
        if (Array.isArray(data.users)) {
          const transformedProviders = data.users.map((user) => {
            const profile = user.serviceProviderProfile || {};
            return {
              id: user.id,
              title: profile.serviceName || `${user.firstName} ${user.lastName}`,
              location: profile.location || "",
              rate: profile.rate || 0,
              averageRating: profile.averageRating || 0,
              coverPhoto: profile.coverPhotoUrl || "/cover-photo.jpg",
              category: profile.serviceCategory || "All Services",
              ...user,
            };
          });
          setProviders(transformedProviders);
        } else {
          console.error("Expected 'users' to be an array, but got:", data.users);
          setProviders([]);
        }
      } catch (error) {
        console.error("Error fetching providers:", error);
        setProviders([]);
      }
    };

    fetchProviders();
  }, []);

  const scrollLeft = (ref) => {
    if (ref.current) ref.current.scrollLeft -= 200;
  };

  const scrollRight = (ref) => {
    if (ref.current) ref.current.scrollLeft += 200;
  };

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

  const filteredServices = providers.filter((item) => {
    const selected = selectedCategory?.toLowerCase();
    const category = item.category?.toLowerCase();

    const matchesCategory =
      !selectedCategory ||
      selectedCategory === "All Services" ||
      category === selected;

    const matchesLocation = !selectedLocation || item.location === selectedLocation;
    return matchesCategory && matchesLocation;
  });

  return (
    <div className="pageBackgroundColor">
      <div className="container">
        {/* Categories Bar */}
        <div className="categoriesBar">
          <button className="scrollButton left" onClick={() => scrollLeft(scrollRef)}>
            <ArrowLeftOutlined />
          </button>
          <div className="categoryScroll" ref={scrollRef}>
            {categories.map((category, index) => (
              <div
                key={index}
                className={`categoryCard ${selectedCategory === category.name ? "active" : ""}`}
                onClick={() => handleCategoryClick(category.name)}
              >
                <img src={category.icon} alt={category.name} className="categoryIcon" />
                <p className="categoryLabel">{category.name}</p>
              </div>
            ))}
          </div>
          <button className="scrollButton right" onClick={() => scrollRight(scrollRef)}>
            <ArrowRightOutlined />
          </button>
        </div>

        {/* Service Listings */}
        <div>
          {selectedCategory && (
            <p className="resultTitle">
              <strong>{selectedCategory}</strong> category:
            </p>
          )}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: "1rem",
            }}
          >
            {filteredServices.map((item) => (
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
                  </div>
                  <div className="galleryItemBottomRow">
                    <p className="galleryItemRatings">Ratings: {item.averageRating}</p>
                    <p className="galleryItemLocation">{item.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
