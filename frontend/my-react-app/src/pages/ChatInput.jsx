// ChatInput.jsx
import React, { useState } from "react";

const ChatInput = ({ onSend }) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim()) {
      console.log("✅ 보내는 메시지:", text); // 👉 찍히는지 확인
      onSend(text);
      setText("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div
      style={{
        display: "flex",
        padding: "0.5rem",
        borderTop: "1px solid #ccc",
      }}
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type a message..."
        style={{ flex: 1, padding: "0.5rem" }}
      />
      <button onClick={handleSend} style={{ marginLeft: "0.5rem" }}>
        Send
      </button>
    </div>
  );
};

export default ChatInput;