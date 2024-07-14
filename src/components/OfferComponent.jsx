import React from "react";
import { useOffersContext } from "../Context/OffersContext";
import "./OfferComponent.css";
import Offers from "./Offers";
const OfferComponent = () => {
  const { handleFilterChange } = useOffersContext();

  return (
    <div>
      <div className="offer-caption">
        <h2>Exclusive Offers</h2>
        <ul>
          <li onClick={() => handleFilterChange("ALL")}>BestOffers</li>
          <li onClick={() => handleFilterChange("FLIGHTS")}>Flight</li>
          <li onClick={() => handleFilterChange("HOTELS")}>Hotel</li>
          <li onClick={() => handleFilterChange("CABS")}>Cab</li>
        </ul>
      </div>
      <div>
        <Offers />
      </div>
    </div>
  );
};

export default OfferComponent;
