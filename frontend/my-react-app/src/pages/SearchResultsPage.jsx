// src/pages/SearchResultsPage.jsx
import React from 'react';
import "./SearchResultsPage.css"
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const allServices = [
    /* Example Data for Popular Services */
    { id: 1, title: "Make-up Artist", rating: 5.0, description: "Professional photography services. Delivering high-quality, impactful imagery.", rate: 50, location: "Wollongong", isPopular: "yes", profilePic: "/profilepic.jpg", coverPhoto: "/cover-photo.jpg" },
    { id: 2, title: "Photographer", rating: 4.3, description: "Professional photography services. Delivering high-quality, impactful imagery.", rate: 35, location: "Keiraville", isPopular: "yes", profilePic: "/profilepic.jpg", coverPhoto: "/cover-photo.jpg" },
    { id: 3, title: "Professional DJ", rating: 4.1, description: "Professional photography services. Delivering high-quality, impactful imagery.", rate: 48, location: "Austinmer", isPopular: "yes", profilePic: "/profilepic.jpg", coverPhoto: "/cover-photo.jpg" },
    { id: 4, title: "Tables and Chairs", rating: 4.0, description: "Professional photography services. Delivering high-quality, impactful imagery.", rate: 78, location: "Coniston", isPopular: "yes", profilePic: "/profilepic.jpg", coverPhoto: "/cover-photo.jpg" },
    { id: 5, title: "Photographer", rating: 4.9, description: "Professional photography services. Delivering high-quality, impactful imagery.", rate: 67, location: "Wollongong", isPopular: "yes", profilePic: "/profilepic.jpg", coverPhoto: "/cover-photo.jpg" },
    { id: 6, title: "Hair Stylist", rating: 4.8, description: "Professional photography services. Delivering high-quality, impactful imagery.", rate: 58, location: "Dapto", isPopular: "yes", profilePic: "/profilepic.jpg", coverPhoto: "/cover-photo.jpg" },
    { id: 7, title: "Singer/Musician", rating: 4.2, description: "Professional photography services. Delivering high-quality, impactful imagery.", rate: 31, location: "North Wollongong", isPopular: "yes", profilePic: "/profilepic.jpg", coverPhoto: "/cover-photo.jpg" },
    { id: 8, title: "Emcee", rating: 4.4, description: "Professional photography services. Delivering high-quality, impactful imagery.", rate: 47, location: "Thirroul", isPopular: "yes", profilePic: "/profilepic.jpg", coverPhoto: "/cover-photo.jpg" },
    { id: 9, title: "Make-up Artist", rating: 4.5, description: "Professional photography services. Delivering high-quality, impactful imagery.", rate: 61, location: "Corrimal", isPopular: "yes", profilePic: "/profilepic.jpg", coverPhoto: "/cover-photo.jpg" },
    { id: 10, title: "Make-up Artist", rating: 3.2, description: "Professional photography services. Delivering high-quality, impactful imagery.", rate: 48, location: "Warrawong", isPopular: "no", profilePic: "/profilepic.jpg", coverPhoto: "/cover-photo.jpg" },
    { id: 11, title: "Photographer", rating: 4.9, description: "Professional photography services. Delivering high-quality, impactful imagery.", rate: 51, location: "Wollongong", isPopular: "no", profilePic: "/profilepic.jpg", coverPhoto: "/cover-photo.jpg" },
    { id: 12, title: "Professional DJ", rating: 3.2, description: "Professional photography services. Delivering high-quality, impactful imagery.", rate: 38, location: "Corrimal", isPopular: "no", profilePic: "/profilepic.jpg", coverPhoto: "/cover-photo.jpg" },
    { id: 13, title: "Tables and Chairs", rating: 3.9, description: "Professional photography services. Delivering high-quality, impactful imagery.", rate: 32, location: "Cringila", isPopular: "no", profilePic: "/profilepic.jpg", coverPhoto: "/cover-photo.jpg" },
    { id: 14, title: "Photographer", rating: 4.7, description: "Professional photography services. Delivering high-quality, impactful imagery.", rate: 67, location: "Wollongong", isPopular: "no", profilePic: "/profilepic.jpg", coverPhoto: "/cover-photo.jpg" },
    { id: 15, title: "Hair Stylist", rating: 2.2, description: "Professional photography services. Delivering high-quality, impactful imagery.", rate: 58, location: "Horsley", isPopular: "no", profilePic: "/profilepic.jpg", coverPhoto: "/cover-photo.jpg" },
    { id: 16, title: "Singer/Musician", rating: 2.9, description: "Professional photography services. Delivering high-quality, impactful imagery.", rate: 31, location: "Wollongong", isPopular: "no", profilePic: "/profilepic.jpg", coverPhoto: "/cover-photo.jpg" },
    { id: 17, title: "Emcee", rating: 3.7, description: "Professional photography services. Delivering high-quality, impactful imagery.", rate: 47, location: "Warrawong", isPopular: "no", profilePic: "/profilepic.jpg", coverPhoto: "/cover-photo.jpg" },
    { id: 18, title: "Make-up Artist", rating: 4.8, description: "Professional photography services. Delivering high-quality, impactful imagery.", rate: 61, location: "West Wollongong", isPopular: "no", profilePic: "/profilepic.jpg", coverPhoto: "/cover-photo.jpg" },
];

const useQuery = () => new URLSearchParams(useLocation().search);

const SearchResultsPage = () => {
    const query = useQuery();
    const searchTerm = query.get("q")?.toLowerCase() || "";
    const locationFilter = query.get("loc") || "All Locations";
  
    const filteredServices = allServices.filter((item) => {
        const matchesSearch = searchTerm === "" || item.title.toLowerCase().startsWith(searchTerm);
        const matchesLocation = locationFilter === "All Locations" || item.location === locationFilter;
        return matchesSearch && matchesLocation;
    });

    const navigate = useNavigate();
    const goToServicePage = (id) => {
        navigate(`/service/${id}`);
    };
  
    return (
        <div className="pageBackground">
            <div className="container">
                <div>
                <p className="resultTitle">
                    {searchTerm || locationFilter !== "All Locations" ? (
                    <>
                        Showing results for:
                        {searchTerm && <> <strong>{searchTerm}</strong></>}
                        {locationFilter !== "All Locations" && <> in <strong>{locationFilter}</strong></>}
                    </>
                    ) : (
                    <>Showing: <strong>All Services</strong></>
                    )}
                </p>

                {filteredServices.length > 0 ? (
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
                ) : (
                    <p>No results found.</p>
                )}
                </div>
            </div>
        </div>
    );
  };
  
  export default SearchResultsPage;