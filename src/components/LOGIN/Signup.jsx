import React, { useState } from "react";
import "./Signup.css";
import { IoIosClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Signup = ({ handleToggle, closeButton }) => {
  const [name, setName] = useState;
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    if (!name) {
      return alert("Name is required.");
    }
    if (!email) {
      return alert("Email is required.");
    }
    if (!password) {
      return alert("Password is required.");
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
            name: name,
            email: email,
            password: password,
            appType: "bookingportals",
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      const token = data.token;
      localStorage.setItem("token", token);

      if (data.token && data.data && data.data.user) {
        localStorage.setItem("token", data.token);
        localStorage.setItem(
          "All-User-Details",
          JSON.stringify(data.data.user)
        );
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
      <form onSubmit={register}>
        <div className="SignupPage">
          <div className="signup-heading">
            <h4 className="heading">Login or Create an account</h4>
            <IoIosClose className="close" onClick={closeButton} />
          </div>
          <div className="names">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <br />
          <input
            type="text"
            placeholder="Email address"
            className="email-input"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            type="text"
            placeholder="New password"
            className="pwd-input"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button
            type="submit"
            className="signupbtn"
            name="submit"
            onClick={register}
          >
            Register
          </button>
          <br />
          <p className="para-foot">
            By logging in, I understand & agree to EaseMyTrip terms of use and
            privacy policy
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
