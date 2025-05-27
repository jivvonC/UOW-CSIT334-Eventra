// src/pages/ChatRoomList.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const ChatRoomList = ({
  onSelectRoom,
  userId,
  token,
  selectedRoomId,
  userRole,
  refreshTrigger,
}) => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    if (!token) return;

    axios
      .get("http://localhost:9090/api/v1/chat/rooms/my", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setRooms(res.data.chatRooms ?? res.data);
      })
      .catch((err) => console.error("채팅방 불러오기 실패", err));
  }, [token, refreshTrigger]);

  return (
    <div
      style={{
        width: 240,
        borderRight: "1px solid #eee",
        padding: "1rem",
        overflowY: "auto",
      }}
    >
      <h4>My Chat Rooms</h4>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {rooms.map((room) => {
          const other =
            room.participant1.id === userId
              ? room.participant2
              : room.participant1;

          const isSelected = room.id === selectedRoomId;

          const otherName =
            other.role === "SERVICE_PROVIDER"
              ? other.serviceProviderProfile?.serviceName ||
                `${other.firstName} ${other.lastName}`
              : `${other.firstName} ${other.lastName}`;

          return (
            <li key={room.id} style={{ margin: "0.5rem 0" }}>
              <button
                style={{
                  width: "100%",
                  textAlign: "left",
                  padding: "0.5rem",
                  cursor: "pointer",
                  borderRadius: "4px",
                  background: isSelected ? "#e6f7ff" : "none",
                  border: isSelected
                    ? "1px solid #1890ff"
                    : "1px solid transparent",
                }}
                onClick={() => onSelectRoom(room)}
              >
                <strong>{otherName}</strong>
                <br />
                <small>{new Date(room.lastMessageAt).toLocaleString()}</small>
              </button>
            </li>
          );
        })}
        {rooms.length === 0 && <li>진행 중인 채팅방이 없습니다.</li>}
      </ul>
    </div>
  );
};

export default ChatRoomList;
