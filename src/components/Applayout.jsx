import React from "react";
import Navbar from "./NAVBAR/Navbar";
import { Outlet } from "react-router-dom";
import Offers from "./Offers";

const Applayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Applayout;
