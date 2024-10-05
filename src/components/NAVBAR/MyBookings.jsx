import React, { useEffect, useState } from "react";
import "../NAVBAR/MyBookings.css";
import BookingConfirmation from "./BookingConfirmation";

const MyBookings = () => {
  const [booking, setBooking] = useState();
  useEffect(() => {
    const BookingDetails = async () => {
      try {
        const response = await fetch(
          `https://academics.newtonschool.co/api/v1/bookingportals/booking`,
          {
            method: "GET",
            headers: {
              projectID: "wniajom2ck2s",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setBooking(data.data);
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch hotel details:", error);
      }
    };

    BookingDetails();
  }, []);
  return (
    <div>
      <div className="booking-history"></div>
    </div>
  );
};

export default MyBookings;
