import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import DropDownInside from "./DropDownInside";
import "./Navbar.css";
import { useOffersContext } from "../../Context/OffersContext";

export default function Navbar() {
  const [login, setLogin] = useState(false);
  const { handleFilterChange } = useOffersContext();
  function handleAccountOpen() {
    setLogin((prevLogin) => !prevLogin);
  }
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
      <div className="myaccount" onClick={handleAccountOpen}>
        <FaUser className="user-icon" />
        <p>My Account</p>
      </div>

      {login && <DropDownInside />}
    </div>
  );
}
