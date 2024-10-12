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

          {openAccordion === index && (
            <div className="accordion-content">
              {/* <div className="details">
                <p>
                  <strong>Created At:</strong>{" "}
                  {new Date(item.created_at).toLocaleString()}
                </p>
                <p>
                  <strong>Start Date:</strong>{" "}
                  {new Date(item.start_date).toLocaleDateString()}
                </p>
                <p>
                  <strong>End Date:</strong>{" "}
                  {new Date(item.end_date).toLocaleDateString()}
                </p>
              </div> */}

              {/* {item.flight && (
                <div className="flight-details">
                  <h4>Flight Information</h4>
                  <p>
                    <strong>Flight ID:</strong> {item.flight.flightID}
                  </p>
                  <p>
                    <strong>Airline ID:</strong> {item.flight.airline}
                  </p>
                  <p>
                    <strong>Aircraft Model ID:</strong>{" "}
                    {item.flight.aircraftModel}
                  </p>
                  <p>
                    <strong>Source:</strong> {item.flight.source}
                  </p>
                  <p>
                    <strong>Destination:</strong>{" "}
                    {item.flight.destination || "Unknown"}
                  </p>
                </div>
              )} */}
              {/* 
              {item.hotel && (
                <div className="hotel-details">
                  <h4>Hotel Information</h4>
                  <p>
                    <strong>Hotel Name:</strong> {item.hotel.name}
                  </p>
                  <p>
                    <strong>Check-in:</strong>{" "}
                    {new Date(item.hotel.checkIn).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Check-out:</strong>{" "}
                    {new Date(item.hotel.checkOut).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Room Type:</strong> {item.hotel.roomType}
                  </p>
                </div>
              )} */}

              {/* {item.train && (
                <div className="train-details">
                  <h4>Train Information</h4>
                  <p>
                    <strong>Train ID:</strong> {item.train.trainID}
                  </p>
                  <p>
                    <strong>Departure:</strong>{" "}
                    {new Date(item.train.departure).toLocaleString()}
                  </p>
                  <p>
                    <strong>Source:</strong> {item.train.source}
                  </p>
                  <p>
                    <strong>Destination:</strong> {item.train.destination}
                  </p>
                </div>
              )} */}

              {/* {item.bus && (
                <div className="bus-details">
                  <h4>Bus Information</h4>
                  <p>
                    <strong>Bus ID:</strong> {item.bus.busID}
                  </p>
                  <p>
                    <strong>Departure:</strong>{" "}
                    {new Date(item?.bus?.departure).toLocaleString()}
                  </p>
                  <p>
                    <strong>Source:</strong> {item.bus.source}
                  </p>
                  <p>
                    <strong>Destination:</strong> {item.bus.destination}
                  </p>
                </div>
              )} */}

              {/* {item.user && (
                <div className="user-details">
                  <h4>User Information</h4>
                  <p>
                    <strong>Name:</strong> {item.user.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {item.user.email}
                  </p>
                </div>
              )} */}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyBookings;
