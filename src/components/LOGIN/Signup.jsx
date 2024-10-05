import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import "../LOGIN/Signup.css";
const Signup = ({ handleToggle, closeButton }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const register = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    if (!name.trim() || !email.trim() || !password.trim()) {
      return alert("All fields are required.");
    }

    try {
      const response = await fetch(
        "https://academics.newtonschool.co/api/v1/bookingportals/signup",
        {
          method: "POST",
          headers: {
            projectID: "wniajom2ck2s",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            password: password.trim(),
            appType: "bookingportals",
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.token && data.data && data.data.user) {
        localStorage.setItem("token", data.token);
        localStorage.setItem(
          "All-User-Details",
          JSON.stringify(data.data.user)
        );
        closeButton();
        navigate("/");
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed. Please check your details and try again.");
    }
  };

  return (
    <div>
      <form onSubmit={register}>
        <div className="SignupPage">
          <div className="signup-heading">
            <h4 className="heading">Create an account</h4>
            <IoIosClose className="close" onClick={closeButton} />
          </div>
          <input
            type="text"
            placeholder="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email address"
            className="email-input"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="New password"
            className="pwd-input"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <button type="submit" className="signupbtn">
            Register
          </button>
          <p className="para-foot">
            By registering, I understand & agree to EaseMyTrip terms of use and
            privacy policy
          </p>
          <p>
            Already have an account? <span onClick={handleToggle}>Login</span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
