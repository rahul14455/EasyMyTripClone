import React from "react";
import Navbar from "./NAVBAR/Navbar";
import { Outlet } from "react-router-dom";
import Offers from "./Offers";

const Applayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Offers />
    </div>
  );
};

export default Applayout;
