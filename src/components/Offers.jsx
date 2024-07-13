import React, { useEffect, useState, useRef } from "react";
import {
  FaRegArrowAltCircleRight,
  FaRegArrowAltCircleLeft,
} from "react-icons/fa";
import "./Offers.css";
import { useOffersContext } from "../Context/OffersContext";

const Offers = () => {
  const [offers, setOffers] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const offersSectionRef = useRef(null);
  const { type } = useOffersContext();
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch(
          `https://academics.newtonschool.co/api/v1/bookingportals/offers?filter={"type":"${type}"}`,
          {
            method: "GET",
            headers: {
              projectID: "wniajom2ck2s",
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const jsonResponse = await response.json();
        setOffers(jsonResponse.data?.offers || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchOffers();
    console.log(window.client);
  }, [type]);

  const handleScrollLeft = () => {
    const newPosition = Math.max(scrollPosition - 1, 0);
    setScrollPosition(newPosition);
    if (offersSectionRef.current) {
      offersSectionRef.current.scrollBy({
        left: -offersSectionRef.current.clientWidth,
        behavior: "smooth",
      });
    }
  };

  const handleScrollRight = () => {
    const newPosition = Math.min(scrollPosition + 1, offers.length - 1);
    setScrollPosition(newPosition);
    if (offersSectionRef.current) {
      offersSectionRef.current.scrollBy({
        left: offersSectionRef.current.clientWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="carousel-container">
      <button onClick={handleScrollLeft} disabled={scrollPosition === 0}>
        <FaRegArrowAltCircleLeft />
      </button>
      <div className="offers-section" ref={offersSectionRef}>
        {offers.length > 0 ? (
          offers.map((offer) => (
            <div className="offercard" key={offer._id}>
              <div className="offer-details">
                <img src={offer.newHeroUrl} alt={offer.lob} />
                <div className="offer-type">
                  <h3>{offer.type}</h3>
                  <p>{offer.Fl}</p>
                </div>
                <div className="offer-title">
                  <p>{offer.pTl}</p>
                  <p>{offer.pTx}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No offers available</p>
        )}
      </div>
      <button
        onClick={handleScrollRight}
        disabled={scrollPosition === offers.length - 1}
      >
        <FaRegArrowAltCircleRight />
      </button>
    </div>
  );
};

export default Offers;
