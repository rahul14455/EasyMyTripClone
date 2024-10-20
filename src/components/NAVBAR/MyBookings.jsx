import React, { useEffect, useState } from "react";
import "../NAVBAR/MyBookings.css";

const MyBookings = () => {
  const [booking, setBooking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openAccordion, setOpenAccordion] = useState(null); // State to manage accordion open/close

  useEffect(() => {
    const fetchBookingDetails = async () => {
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
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, []);

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  if (loading) {
    return <div className="loading">Loading bookings...</div>;
  }

  if (error) {
    return <div className="error">Error fetching bookings: {error}</div>;
  }

  if (!booking || booking.length === 0) {
    return <div className="no-bookings">No bookings found.</div>;
  }

  return (
    <div className="booking-history">
      <h2>My Bookings</h2>
      {booking.map((item, index) => (
        <div
          key={item._id}
          className={`booking-card ${
            item.status === "confirmed" ? "confirmed" : ""
          }`}
        >
          <div
            className="booking-header"
            onClick={() => toggleAccordion(index)}
          >
            <h3>Trip ID: {item._id}</h3>
            <p className={`status ${item.status}`}>Status: {item.status}</p>
            <p>
              <strong>Booking Type:</strong> {item.booking_type}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyBookings;
