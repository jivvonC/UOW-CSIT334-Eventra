// ChatWindow.jsx
import React, { useEffect, useRef } from "react";
import "./ChatWindow.css";

const ChatWindow = ({ messages, userId }) => {
  const bottomRef = useRef(null); // 🔽 마지막 요소를 참조할 ref

  useEffect(() => {
    console.log("🖼️ ChatWindow 렌더링됨. 현재 메시지 목록:", messages);
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" }); // 👈 맨 아래로 스크롤
    }
  }, [messages]); // 메시지 배열이 바뀔 때마다 실행

  return (
    <div className="chat-window">
      {messages.map((msg, index) => {
        const isMine = msg.sender?.id === userId;
        return (
          <div
            key={index}
            className={`chat-message ${isMine ? "mine" : "theirs"}`}
          >
            <div className="bubble">
              <div className="sender-name">
                {msg.sender?.displayName ||  msg.sender?.firstName ||  "User"}
              </div>
              <div className="text">{msg.content}</div>
              <div className="timestamp">
                {new Date(msg.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
        );
      })}

      {/* 🔽 여기가 마지막 메시지 아래에 위치한 스크롤 타겟 */}
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatWindow;