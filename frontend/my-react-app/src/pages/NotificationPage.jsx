import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as S from "../style";
import axios from "axios";
import confirm from "../assets/confirm.png";
import message from "../assets/message.png";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const token =
    localStorage.getItem("token") || localStorage.getItem("accessToken");

  // ✅ 사용자 역할 가져오기
  const user = JSON.parse(localStorage.getItem("user"));
  const userRole = user?.role || "UNKNOWN";

  useEffect(() => {
    axios
      .get("http://localhost:9090/api/notifications/my-notifications", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("📨 알림 목록:", res.data);
        setNotifications(res.data.notifications || []);
      })
      .catch((err) => {
        console.error("❌ 알림 가져오기 실패", err);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:9090/api/notifications/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(`✅ 알림 ${id} 삭제됨`);
        setNotifications((prev) => prev.filter((n) => n.id !== id));
      })
      .catch((err) => {
        console.error(`❌ 알림 ${id} 삭제 실패`, err);
      });
  };

  return (
    <div className="pageBackgroundColor">
      <S.Notification>
        <p className="title">Notifications</p>
        <div className="container">
          {notifications.map((n) => {
            let messageText = "";
            let bookingRef = "Unknown";

            if (userRole === "SERVICE_PROVIDER") {
              const refMatch = n.body?.match(
                /(?:Ref:|Booking Reference:)\s*([A-Z0-9]+)/i
              );
              if (refMatch) {
                bookingRef = refMatch[1];
              }
              const match = n.body.match(
                /You have a new booking request from .*? for your service '.*?'./
              );
              messageText = match ? match[0] : n.subject;
            } else if (userRole === "CUSTOMER") {
              const refMatch = n.body?.match(
                /(?:Ref:|Booking Reference:)\s*([A-Z0-9]+)/i
              );
              if (refMatch) {
                bookingRef = refMatch[1];
              }
              const match = n.body.match(
                /Your booking request for '.*?' has been accepted by the provider\..*?$/
              );
              messageText = match ? match[0] : n.subject;
            } else {
              messageText = n.subject;
            }

            return (
              <div key={n.id} className="item">
                <img
                  className="notimg"
                  src={
                    n.notificationType === "NEW_BOOKING_REQUEST"
                      ? confirm
                      : message
                  }
                  alt="icon"
                />
                <p className="notmsg">
                  <strong>Booking Reference: {bookingRef}</strong>
                  <br />
                  {messageText}
                </p>
                <button className="greenbtn" onClick={() => handleDelete(n.id)}>
                  Check
                </button>
              </div>
            );
          })}
        </div>
      </S.Notification>
    </div>
  );
};

export default NotificationPage;
