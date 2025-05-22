import React from "react";
import styled from "styled-components";
import * as S from "../style";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import alert from "../assets/alert.png";

const SignUpSelect = () => {
  const navigate = useNavigate();
  const navigateToSignUp = () => {
    navigate("/signup");
  };
  const navigateToServiceProviderSignUp = () => {
    navigate("/providersignup");
  };

  return (
    <S.WholePage>
      <S.SignUpCard>
        <div className="card">
          <div className="left">
            <h1>Sign Up as a...</h1>
            <br></br>
            <h2>Service User</h2>
            <p className="description">
              Planning a big move or special event?<br></br>Sign up as a Service
              User to easily access trusted,<br></br> pre-vetted help — all in
              one place.
              <br></br>
              Choose from curated bundles or create your own, and book
              everything with just a few taps.<br></br>
            </p>
            <button
              type="submit"
              className="blackbtn"
              onClick={navigateToSignUp}
            >
              Sign up
            </button>
          </div>
          <div className="right">
            <h2>Service Provider</h2>
            <p className="description">
              Join Eventra as a Service Provider to connect with clients during
              key life transitions.
              <br></br>
              You’ll receive bundled job requests, reliable payments, and
              real-time communication tools.<br></br> Build your reputation
              through ratings, reviews, and repeat bookings for only 20 AUD a
              month.
            </p>
            <button
              type="submit"
              className="greenbtn"
              onClick={navigateToServiceProviderSignUp}
            >
              Sign up
            </button>
          </div>
        </div>
      </S.SignUpCard>
    </S.WholePage>
  );
};

export default SignUpSelect;
