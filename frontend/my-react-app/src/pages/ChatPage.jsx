// src/pages/ChatPage.jsx
import React, { useState, useEffect, useRef } from "react";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import axios from "axios";

import ServiceProviderList from "./ServiceProviderList"; // “채팅 시작” 버튼이 있는 서비스 제공자 목록
import ChatRoomList from "./ChatRoomList"; // “내가 속한 채팅방” 목록
import ChatWindow from "./ChatWindow"; // 메시지 목록
import ChatInput from "./ChatInput"; // 입력창 + 전송 버튼

const ChatPage = () => {
  const [userId, setUserId] = useState(null);
  const [stompClient, setStompClient] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0); // ✅ 추가
  const token =
    localStorage.getItem("token") || localStorage.getItem("accessToken");
  const clientRef = useRef(null);

  const getLoggedInUser = () => {
    const userStr = localStorage.getItem("user");
    if (!userStr) return null;
    try {
      const user = JSON.parse(userStr);

      // ✅ displayName 계산
      const isServiceProvider = user.role === "SERVICE_PROVIDER";
      const displayName = isServiceProvider
        ? user.serviceProviderProfile?.userFirstName
        : `${user.firstName}`;

      return {
        ...user,
        displayName, // ✅ displayName 필드 추가
      };
    } catch (e) {
      console.error("❌ Failed to parse user from localStorage", e);
      return null;
    }
  };

  //
  // 2️⃣ STOMP WebSocket 연결
  //
  useEffect(() => {
    if (!token) return;
    const sock = new SockJS("http://localhost:9090/ws");
    const client = Stomp.over(sock);
    client.connect(
      { Authorization: `Bearer ${token}` },
      () => {
        console.log("WebSocket connected");
        setStompClient(client);
        clientRef.current = client;
      },
      (err) => console.error("WebSocket 연결 실패", err)
    );
    return () => clientRef.current?.disconnect();
  }, [token]);

  useEffect(() => {
    if (!token) return;
    axios
      .get("http://localhost:9090/api/users/account", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("🔎 account 응답", res.data);
        const user = res.data.user; // ✅ 여기서 user 변수 선언
        const id = res.data.user?.id;
        const role = res.data.user?.role; // ✅ 선언 필요
        console.log("✅ 내 userId:", id);
        console.log("✅ 내 role:", role);
        setUserId(id);
        setUserRole(role); // ✅ 역할 저장

        if (role === "SERVICE_PROVIDER") {
          console.log(
            "🏷️ 서비스 이름:",
            user.serviceProviderProfile?.serviceName
          );
        } else {
          const fullName = `${user.firstName} ${user.lastName}`;
          console.log("👤 유저 이름:", fullName);
        }
      })
      .catch((err) => console.error("❌ 유저 정보 가져오기 실패", err));
  }, [token]);

  //
  // 3️⃣ 방 선택 시: 과거 메시지 조회 + 실시간 구독
  //
  useEffect(() => {
    if (!selectedRoom?.id || !stompClient) return;

    // 3-1) REST 로 과거 메시지 읽기
    axios
      .get(
        `http://localhost:9090/api/v1/chat/rooms/${selectedRoom.id}/messages`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        // 백엔드가 { chatMessages: [...] } 로 내려주면 res.data.chatMessages
        setMessages(res.data.chatMessages ?? res.data);
      })
      .catch((err) => console.error("메시지 불러오기 실패", err));

    // 3-2) STOMP SUBSCRIBE
    const subscription = stompClient.subscribe(
      `/topic/room/${selectedRoom.id}`,
      (msg) => {
        console.log("📩 [실시간] RAW 메시지 수신됨:", msg); // 👈 이거 추가
        try {
          const newMsg = JSON.parse(msg.body);
          console.log("📩 [실시간] 파싱된 메시지:", newMsg); // 👈 이거 추가
          setMessages((prev) => [...prev, newMsg]);
        } catch (e) {
          console.error("❌ JSON 파싱 실패", e);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
      setMessages([]); // 방 바뀔 때 이전 메시지 초기화
    };
  }, [selectedRoom, stompClient, token]);

  //
  // 4️⃣ 메시지 전송
  //
  const send = (content) => {
    if (!stompClient || !selectedRoom?.id || !userId) {
      console.log("⚠️ 메시지 전송 실패 - 누락된 값", {
        stompClient,
        selectedRoom,
        userId,
      });
      return;
    }

    const dto = {
      chatRoomId: selectedRoom.id,
      content: content.trim(),
    };
    console.log("보내는 메시지:", dto);
    stompClient.send("/app/chat.send", {}, JSON.stringify(dto));

    const user = getLoggedInUser();
    const displayName = user?.displayName || "Unknown";
    console.log("👤 displayName to send:", displayName);

    const tempMessage = {
      chatRoomId: selectedRoom.id,
      content: content.trim(),
      timestamp: new Date().toISOString(),
      sender: {
        id: userId,
        displayName, // ✅ 이렇게 확실히 넣기
      },
    };

    setMessages((prev) => [...prev, tempMessage]);
  };

  //
  // 5️⃣ 서비스 제공자 선택 → 채팅방 생성 or 기존 방 열기
  //
  const handleProviderSelect = (provider) => {
    axios
      .post(
        "http://localhost:9090/api/v1/chat/rooms/initiate",
        { otherUserId: provider.id },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        // res.data.chatRoom 에 새로 만들거나 기존 방 정보가 들어있음
        const room = res.data.chatRoom || res.data;
        setSelectedRoom(room);

        // ✅ 새로운 채팅방 생성 후 트리거 증가 → 방 목록 useEffect 다시 실행
        setRefreshTrigger((prev) => prev + 1);
      })
      .catch((err) => console.error("채팅방 생성 실패", err));
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* 1) 좌측: 서비스 제공자 목록 → 선택 시 handleProviderSelect 호출 */}
      {userRole !== "SERVICE_PROVIDER" && (
        <ServiceProviderList onProviderSelect={handleProviderSelect} />
      )}

      {/* 2) 중간: 내가 속한 채팅방 목록 → 클릭 시 setSelectedRoom */}
      <ChatRoomList
        onSelectRoom={setSelectedRoom}
        userId={userId}
        token={token}
        selectedRoomId={selectedRoom?.id} // ✅ 현재 선택된 방 ID 넘김
        userRole={userRole}
        refreshTrigger={refreshTrigger} // ✅ 전달
      />

      {/* 3) 우측: 선택된 방의 메시지 + 입력창 */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <ChatWindow messages={messages} userId={userId} />
        <ChatInput onSend={send} />
      </div>
    </div>
  );
};

export default ChatPage;
