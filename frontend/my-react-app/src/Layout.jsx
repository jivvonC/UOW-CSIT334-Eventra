import React, { useState } from 'react';
import NavBar from './components/NavBar';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const Layout = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (query) => {
    const trimmedQuery = query.trim();
    setSearchQuery(trimmedQuery);

    if (trimmedQuery === '') {
      navigate(`/search`);
    } else {
      navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`);
    }
  };

  // Optional: Reset state when returning home
  React.useEffect(() => {
    if (location.pathname === '/' && !location.search) {
      setSearchQuery('');
    }
  }, [location]);

  return (
    <>
      <NavBar onSearch={handleSearch} />
      <main className="p-4">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
