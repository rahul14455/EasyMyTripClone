import React, { useState } from "react";
import "./Login.css";
import { IoIosClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
const Login = ({ closeButton, handleToggle }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const loginfunction = async (e) => {
    e.preventDefault();
    if (!email) {
      alert("Email is required.");
      return;
    }
    if (!password) {
      alert("Password is required.");
      return;
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
            email: email,
            password: password,
            appType: "bookingportals",
          }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);
      if (data.token && data.data && data.data.user) {
        localStorage.setItem("token", data.token);
        localStorage.setItem(
          "All-User-Details",
          JSON.stringify(data.data.user)
        );
        closeButton();
        navigate("/");
      } else {
        alert("Login failed, please check your credentials and try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed, please check console for details.");
    }
  };
  return (
    <div>
      <form onSubmit={loginfunction}>
        <div className="LoginPage">
          <div className="login-heading">
            <h4 className="heading">Login or Create an account</h4>
            <IoIosClose className="close" onClick={closeButton} />
          </div>
          <div className="login-box">
            <input
              type="text"
              name="username"
              className="email-input"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <input
              type="password"
              className="pwd-input"
              placeholder="Password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <button
              type="submit"
              className="loginbtns"
              name="submit"
              onClick={loginfunction}
            >
              Login
            </button>
          </div>
          <br />
          <h5 className="create-account" onClick={handleToggle}>
            Create New Account?
          </h5>
          <br />
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
