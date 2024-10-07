import React, { useState } from "react";
import "../Payment/FlightPayment.css";
import qrcode from "../Payment/QRCode.png";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import BookingConfirmation from "../../NAVBAR/BookingConfirmation";

const FlightPayment = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("upi");

  const location = useLocation();
  const { ticketPrice, _id, date } = location.state || {};

  console.log({ ticketPrice, _id, date }); // Log for debugging

  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expMonth, setExpMonth] = useState("");
  const [expYear, setExpYear] = useState("");
  const [cvv, setCvv] = useState("");

  const isUpiPaymentValid = upiId.trim() !== "";

  const isCardPaymentValid =
    cardNumber.length === 16 &&
    /^[0-9]+$/.test(cardNumber) &&
    cardName.trim() !== "" &&
    expMonth.length === 2 &&
    /^[0-9]+$/.test(expMonth) &&
    expYear.length === 4 &&
    /^[0-9]+$/.test(expYear) &&
    cvv.length === 3 &&
    /^[0-9]+$/.test(cvv);

  function convertDateString(input) {
    // Parse the input date string
    const [day, monthStr, year] = input.split("/");

    // Convert month string to month number
    const month = new Date(Date.parse(monthStr + " 1, 2021")).getMonth(); // Jan is 0, so this will return 9 for Oct

    // Create a new Date object
    const date = new Date(year, month, day);

    // Convert to ISO string and format it
    const isoString = date.toISOString(); // This gives the format YYYY-MM-DDTHH:mm:ss.sssZ

    // Add the time and offset, assuming the time is the same as in your example
    const formattedDate =
      isoString.replace("Z", "+00:00").slice(0, 23) + "00:00"; // Adjust the last part

    return formattedDate;
  }
  const navigate = useNavigate();
  const Payload = () => {
    navigate("/");

    const bookingData = {
      bookingType: "flight",
      bookingDetails: {
        flightId: _id,
        startDate: date, // Check-in Date and Time
        endDate: date, // Check-out Date and Time
      },
    };
    BookingConfirmation(bookingData);
  };

  return (
    <div className="payment-flight-main">
      <div className="payment-left">
        <h2 className="payment-title">Payment Mode</h2>

        <div
          className={`payment-option ${
            selectedPaymentMethod === "upi" ? "active" : ""
          }`}
          onClick={() => setSelectedPaymentMethod("upi")}
        >
          <img
            src="https://cdn.iconscout.com/icon/free/png-256/free-upi-logo-icon-download-in-svg-png-gif-file-formats--unified-payments-interface-payment-money-transfer-logos-icons-1747946.png?f=webp"
            alt="UPI Logo"
            className="payment-icon"
          />
          <div className="payment-description">
            <h3>UPI Options</h3>
            <p>Make Online Payments Directly from Bank</p>
          </div>
        </div>

        <div
          className={`payment-option ${
            selectedPaymentMethod === "card" ? "active" : ""
          }`}
          onClick={() => setSelectedPaymentMethod("card")}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/2695/2695971.png"
            alt="Card Icon"
            className="payment-icon"
          />
          <div className="payment-description">
            <h3>Credit/Debit/ATM Card</h3>
            <p>Visa, MasterCard, Amex, Rupay And More</p>
          </div>
        </div>
      </div>

      <div className="payment-right">
        {selectedPaymentMethod === "upi" && (
          <div className="upi-payment">
            <div className="upi-id-input">
              <label>Enter Your UPI ID</label>
              <input
                type="text"
                placeholder="UPI ID"
                className="input-field"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
              />
            </div>
            <div className="qr-code">
              <label>Scan the QR Code</label>
              <img src={qrcode} alt="QR Code" />
            </div>
            <div className="total-fare">
              <span>Total Fare: </span>
              <span className="fare-amount">₹ {ticketPrice}</span>
            </div>
            <button
              type="submit"
              className="upi-payment-btn"
              disabled={!isUpiPaymentValid}
              onClick={Payload}
            >
              Make Payment
            </button>
          </div>
        )}

        {selectedPaymentMethod === "card" && (
          <div className="card-payment-container">
            <form className="payment-form">
              <div className="form-group">
                <label htmlFor="cardNumber">Card Number</label>
                <input
                  type="text"
                  id="cardNumber"
                  placeholder="Enter Your Card Number Here"
                  className="input-field"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="cardName">Name on card</label>
                <input
                  type="text"
                  id="cardName"
                  placeholder="Enter Your Name Here"
                  className="input-field"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="expiry">Expiry Date</label>
                <input
                  type="text"
                  id="expiry"
                  placeholder="MM"
                  className="input-field"
                  value={expMonth}
                  onChange={(e) => setExpMonth(e.target.value)}
                />
                <input
                  type="text"
                  id="expiry"
                  placeholder="YYYY"
                  className="input-field"
                  value={expYear}
                  onChange={(e) => setExpYear(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="cvv">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  placeholder="CVV"
                  className="input-field"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                />
              </div>
            </form>
            <div className="total-fare">
              <span>Total Fare: </span>
              <span className="fare-amount">₹ {ticketPrice}</span>
            </div>
            <button
              type="submit"
              className="card-payment-btn"
              disabled={!isCardPaymentValid}
              onClick={Payload}
            >
              Make Payment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightPayment;
