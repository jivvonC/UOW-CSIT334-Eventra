// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import ScrollToTop from "./ScrollToTop";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Layout from "./Layout";
import AboutPage from "./pages/AboutPage";
import AccountPage from "./pages/AccountPage";
import NotificationPage from "./pages/NotificationPage";
import ChatBoxPage from "./pages/ChatBox";
import Login from "./pages/Login";
import ServiceProfile from "./pages/ServiceProfile";
import SignUp from "./pages/SignUp";
import SignUpSelect from "./pages/SignUpSelect";
import ProviderSignUp from "./pages/ProviderSignUp";
import ForgotPw from "./pages/ForgotPw";
import SearchResultsPage from "./pages/SearchResultsPage";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import ProviderProfile from "./pages/ProviderProfile";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToastContainer
      position="top-center"
      closeButton={false}
      autoClose={4000}
      hideProgressBar
    />
    <BrowserRouter>
      <ScrollToTop />

      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<App />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="account" element={<AccountPage />} />
            <Route path="notification" element={<NotificationPage />} />
            <Route path="chatbox" element={<ChatBoxPage />} />
            <Route path="login" element={<Login />} />
            <Route path="/service/:id" element={<ServiceProfile />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="signupselect" element={<SignUpSelect />} />
            <Route path="providersignup" element={<ProviderSignUp />} />
            <Route path="forgotpw" element={<ForgotPw />} />
            <Route path="/providerprofile/:id" element={<ProviderProfile />} />
            <Route path="/search" element={<SearchResultsPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
