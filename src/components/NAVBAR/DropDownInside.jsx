import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Login from "../LOGIN/Login";
import Signup from "../LOGIN/Signup";
import "./DropDownInside.css";

const DropDownInside = () => {
  const [open, setOpen] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleToggle = () => {
    setIsSignup((prev) => !prev);
  };

  return (
    <div className="main">
      <div className="loginbtn">
        <FaUserCircle className="circle" />
        <button onClick={handleOpen} className="nolinks-handle">
          LOGIN OR SIGNUP
        </button>
      </div>
      <div className="line"></div>

      <div className="list">
        <p>My Booking</p>
        <Link to="/" className="logout">
          Logout
        </Link>
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
          <Login handleToggle={handleToggle} closeButton={handleClose} />
        )}
      </Modal>
    </div>
  );
};

export default DropDownInside;
