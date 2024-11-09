// src/components/NAVBAR/Navbar.js
import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import DropDownInside from "./DropDownInside";
import { useOffersContext } from "../../Context/OffersContext";
import "../NAVBAR/Navbar.css";
export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userName, setUserName] = useState("My Account");
  const { handleFilterChange } = useOffersContext();
  // console.log(localStorage.getItem("All-User-Details"));

  useEffect(() => {
    const handleStorageChange = () => {
      const userDetailsString = localStorage.getItem("All-User-Details");
      console.log(localStorage.getItem("All-User-Details"));
      if (userDetailsString) {
        try {
          const userDetails = JSON.parse(userDetailsString);
          setUserName(userDetails.name || "My Account");
        } catch (error) {
          console.error("Error parsing user details:", error);
          setUserName("My Account");
        }
      } else {
        setUserName("My Account");
      }
    };

    window.addEventListener("storage", handleStorageChange);
    handleStorageChange(); // Initial check
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div className="nav-header">
      <Link to="/">
        <img
          className="logoEase"
          src="https://www.easemytrip.com/images/brandlogo/emtlogo_new6.svg"
          alt="EaseMyTrip Logo"
        />
      </Link>
      <div className="center">
        <NavLink
          to="/"
          className="nolink"
          onClick={() => handleFilterChange("FLIGHTS")}
        >
          Flights
        </NavLink>
        <NavLink
          to="/Hotel"
          className="nolink"
          onClick={() => handleFilterChange("HOTELS")}
        >
          Hotels
        </NavLink>
        <NavLink
          to="/Train"
          className="nolink"
          onClick={() => handleFilterChange("RAILS")}
        >
          Trains
        </NavLink>
        <NavLink
          to="/Bus"
          className="nolink"
          onClick={() => handleFilterChange("CABS")}
        >
          Bus
        </NavLink>
      </div>
      <div
        className="myaccount"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <FaUser className="user-icon" />
        <p>{userName}</p>
      </div>
      {isDropdownOpen && (
        <DropDownInside closeDropdown={() => setIsDropdownOpen(false)} />
      )}
    </div>
  );
}
