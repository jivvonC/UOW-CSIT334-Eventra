// src/pages/ServiceProviderList.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const ServiceProviderList = ({ onProviderSelect }) => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token =
      localStorage.getItem("token") || localStorage.getItem("accessToken");
    axios
      .get("http://localhost:9090/api/users/service-providers", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("🔍 providers response:", res.data);
        setProviders(Array.isArray(res.data.users) ? res.data.users : []);
      })
      .catch((err) => {
        console.error("서비스 제공자 불러오기 실패", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Getting service providers...</p>;
  if (!providers.length) return <p>No registered service providers</p>;

  return (
    <div style={{ width: 250, borderRight: "1px solid #eee", padding: "1rem" }}>
      <h4>Service Providers</h4>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {providers.map((p) => (
          <li key={p.id} style={{ margin: "0.5rem 0" }}>
            <button
              style={{
                width: "100%",
                textAlign: "left",
                background: "none",
                border: "none",
                padding: "0.5rem",
                cursor: "pointer",
              }}
              onClick={() => onProviderSelect(p)}
            >
              {/* ✅ 서비스 이름이 있을 경우 우선 표시 */}
              {p.serviceProviderProfile?.serviceName ||
                `${p.firstName} ${p.lastName}`}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceProviderList;