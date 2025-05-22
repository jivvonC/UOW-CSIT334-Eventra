import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import { Outlet, useNavigate } from 'react-router-dom';

const Layout = () => {
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    
    const handleSearch = (value) => {
        const trimmedValue = value.trim();
        setSearchQuery(trimmedValue); // Update state

        const hasQuery = !!trimmedValue;
        const hasLocation = selectedLocation !== null;

        if (!hasQuery && !hasLocation) {
            navigate(`/search`); // Show home
        } else {
            let queryParams = [];
            if (hasQuery) queryParams.push(`q=${encodeURIComponent(trimmedValue)}`);
            if (hasLocation) queryParams.push(`loc=${encodeURIComponent(selectedLocation)}`);
            navigate(`/search${queryParams.length ? `?${queryParams.join("&")}` : ""}`);
        }
    };

    useEffect(() => {
        const hasQuery = !!searchQuery.trim();
        const hasLocation = selectedLocation !== null;

        if (!hasQuery && !hasLocation) {
            navigate(`/`);
            return;
        }

        let queryParams = [];
        if (hasQuery) queryParams.push(`q=${encodeURIComponent(searchQuery)}`);
        if (hasLocation) queryParams.push(`loc=${encodeURIComponent(selectedLocation)}`);

        navigate(`/search${queryParams.length ? `?${queryParams.join("&")}` : ""}`);
    }, [selectedLocation]);

    return (
        <>
            <NavBar 
                onSearch={handleSearch}
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
            />
            <main className='p-4'>
                <Outlet />
            </main>
        </>
    );
};

export default Layout;