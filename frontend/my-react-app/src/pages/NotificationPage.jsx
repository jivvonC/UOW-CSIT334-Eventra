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

  // ✅ 알림 삭제 함수
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:9090/api/notifications/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(`✅ 알림 ${id} 삭제됨`);
        // 삭제된 알림을 UI에서 제거
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
            const bookingRefMatch = n.body.match(/Booking Reference:\s(\w+)/);
            const bookingRef = bookingRefMatch ? bookingRefMatch[1] : "Unknown";

            const messageMatch = n.body.match(
              /You have a new booking request from .*? for your service '.*?'./
            );
            const messageText = messageMatch ? messageMatch[0] : "";

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
                <button
                  className="greenbtn"
                  onClick={() => handleDelete(n.id)} // ✅ 클릭 시 삭제
                >
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