// src/components/NAVBAR/DropDownInside.jsx
import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Login from "../LOGIN/Login";
import Signup from "../LOGIN/Signup";
import "../NAVBAR/DropDownInside.css";

const DropDownInside = ({ closeDropdown }) => {
  const [open, setOpen] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("My Account");

  useEffect(() => {
    const checkLoginStatus = () => {
      const userDetailsString = localStorage.getItem("All-User-Details");
      if (userDetailsString) {
        try {
          const user = JSON.parse(userDetailsString);
          setUserName(user.name || "My Account");
          setIsLoggedIn(true);
        } catch (error) {
          console.error("Error parsing user details:", error);
          setUserName("My Account");
          setIsLoggedIn(false);
        }
      } else {
        setUserName("My Account");
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
    window.addEventListener("storage", checkLoginStatus);
    return () => window.removeEventListener("storage", checkLoginStatus);
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    closeDropdown();
  };

  const handleToggle = () => setIsSignup((prev) => !prev);

  const handleLogout = () => {
    localStorage.removeItem("All-User-Details");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserName("My Account");
    closeDropdown();
    window.dispatchEvent(new Event("storage"));
  };

  const handleLoginSuccess = (userData) => {
    localStorage.setItem("All-User-Details", JSON.stringify(userData));
    setIsLoggedIn(true);
    setUserName(userData.name || "My Account");
    handleClose();
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="main">
      <div className="loginbtn">
        <FaUserCircle className="circle" />
        {isLoggedIn ? (
          <span className="nolinks-handle">{userName}</span>
        ) : (
          <button onClick={handleOpen} className="nolinks-handle">
            LOGIN OR SIGNUP
          </button>
        )}
      </div>
      <div className="line"></div>
      <div className="list">
        {isLoggedIn && <Link to="/MyBookings">My Bookings</Link>}
        {isLoggedIn ? (
          <p onClick={handleLogout}>Logout</p>
        ) : (
          <p onClick={handleOpen}>Login</p>
        )}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {isSignup ? (
          <Signup handleToggle={handleToggle} closeButton={handleClose} />
        ) : (
          <Login
            handleToggle={handleToggle}
            closeButton={handleClose}
            onLoginSuccess={handleLoginSuccess}
          />
        )}
      </Modal>
    </div>
  );
};

export default DropDownInside;
