// src/pages/NotificationPage.jsx
import React from "react";
import styled from "styled-components";
import * as S from "../style";
import { useNavigate } from "react-router-dom";
import confirm from "../assets/confirm.png";
import message from "../assets/message.png";

const NotificationPage = () => {
  return (
    <div className="pageBackgroundColor">
      <S.Notification>
        <p className="title">Notifications</p>
        <div className="container">
          <div className="item">
            <img className="notimg" src={confirm}></img>
            <p className="notmsg">
              Your Booking with Wollongong Plumbing 20/05/25 16:00 is confirmed!
            </p>
            <button className="greenbtn" type="submit">
              Check
            </button>
          </div>
          <div className="item">
            <img className="notimg" src={message}></img>
            <p className="notmsg">
              You have 3 unread messages. Please check your inbox.
            </p>
            <button className="greenbtn" type="submit">
              Check
            </button>
          </div>
          <button type="submit" className="seemorebtn">
            + more
          </button>
        </div>
      </S.Notification>
    </div>
  );
};

export default NotificationPage;
