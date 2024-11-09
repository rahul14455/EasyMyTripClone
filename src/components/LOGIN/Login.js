import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import "../LOGIN/Login.css";
const Login = ({ closeButton, handleToggle, onLoginSuccess }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const loginFunction = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email.trim() || !password.trim()) {
      return alert("Email and password are required.");
    }

    try {
      const response = await fetch(
        "https://academics.newtonschool.co/api/v1/bookingportals/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            projectid: "wniajom2ck2s",
          },
          body: JSON.stringify({
            email: email.trim(),
            password: password.trim(),
            appType: "bookingportals",
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.token && data.data && data.data.user) {
        localStorage.setItem("token", data.token);
        onLoginSuccess(data.data.user);
        closeButton();
        navigate("/");
      } else {
        alert("Login failed, please check your credentials and try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div>
      <form onSubmit={loginFunction}>
        <div className="LoginPage">
          <div className="login-heading">
            <h4 className="heading">Login to your account</h4>
            <IoIosClose className="close" onClick={closeButton} />
          </div>
          <div className="login-box">
            <input
              type="email"
              name="email"
              className="email-input"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              className="pwd-input"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <button type="submit" className="loginbtns">
              Login
            </button>
          </div>
          <p>
            Don't have an account?{" "}
            <span className="create-account" onClick={handleToggle}>
              Create New Account
            </span>
          </p>
          <p className="para-foot">
            By logging in, I understand & agree to EasyMyTrip terms of use and
            privacy policy
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
