// src/pages/SearchResultsPage.jsx
import React, { useEffect, useState } from "react";
import "./SearchResultsPage.css";
import { useLocation, useNavigate } from "react-router-dom";

const useQuery = () => new URLSearchParams(useLocation().search);

const SearchResultsPage = () => {
  const query = useQuery();
  const searchTerm = query.get("q")?.toLowerCase() || "";
  const locationFilter = query.get("loc") || "All Locations";

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!searchTerm) {
      setServices([]); // no search term, clear services or you can fetch all if you want
      return;
    }

    const fetchServices = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:9090/api/users/service-providers/search?name=${encodeURIComponent(searchTerm)}`);
        if (!response.ok) throw new Error("Failed to fetch service providers");
        const data = await response.json();

        setServices(data.users || []);
      } catch (err) {
        setError(err.message || "Unknown error");
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [searchTerm]);

  const filteredServices = services.filter((item) => {
    if (locationFilter === "All Locations") return true;
    return (item.serviceProviderProfile?.location || "").toLowerCase() === locationFilter.toLowerCase();
  });

  const goToServicePage = (id) => {
    navigate(`/providerprofile/${id}`);
  };

  const normalizedServices = filteredServices.map(user => ({
    id: user.id,
    coverPhoto: user.coverPhoto || "/cover-photo.jpg", // Add coverPhoto if available on user or fallback
    title: user.serviceProviderProfile?.serviceName || user.firstName || "No Title",
    averageRating: user.serviceProviderProfile?.averageRating ?? "N/A",
    location: user.serviceProviderProfile?.location || "Unknown Location",
    }));


  return (
    <div className="pageBackground">
      <div className="container">
        <div>
          <p className="resultTitle">
            {searchTerm || locationFilter !== "All Locations" ? (
              <>
                Showing results for:
                {searchTerm && <><strong> {searchTerm} </strong></>}
                {locationFilter !== "All Locations" && <> in <strong>{locationFilter}</strong></>}
              </>
            ) : (
              <>Showing: <strong>All Services</strong></>
            )}
          </p>

          {loading && <p>Loading services...</p>}
          {error && <p style={{ color: "red" }}>Error: {error}</p>}

          {!loading && !error && (
            normalizedServices.length > 0 ? (
                <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                    gap: "1rem",
                }}
                >
                {normalizedServices.map((item) => (
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
                        onError={(e) => { e.target.src = "/cover-photo.jpg"; }}
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
            ) : (
                <p>No results found.</p>
            )
            )}
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;
