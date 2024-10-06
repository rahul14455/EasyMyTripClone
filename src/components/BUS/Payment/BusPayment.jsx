import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import qrcode from "../../FLIGHTS/Payment/QRCode.png";
import "../Payment/BusPayment.css";
import BookingConfirmation from "../../NAVBAR/BookingConfirmation";

const BusPayment = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("upi");

  const location = useLocation();

  // Retrieve totalFare, _id, and date from location state
  const { totalFare, _id, date } = location.state || {};
  console.log(_id);
  // State for UPI and Card inputs
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expMonth, setExpMonth] = useState("");
  const [expYear, setExpYear] = useState("");
  const [cvv, setCvv] = useState("");

  // Validation logic for UPI
  const isUpiPaymentValid = upiId.trim() !== "";

  const Payload = () => {
    const bookingData = {
      bookingType: "bus",
      bookingDetails: {
        BusId: _id,
        startDate: date, // Check-in Date and Time
        endDate: date, // Check-out Date and Time
      },
    };
    BookingConfirmation(bookingData);
  };

  // Validation logic for card payment
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

  return (
    <div className="payment-flight-main">
      <div className="payment-left">
        <h2 className="payment-title">Payment Mode</h2>

        {/* UPI Options */}
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

        {/* Card Options */}
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
            <p>Visa,MasterCard,Amex,Rupay And More</p>
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
              <span className="fare-amount">₹ {totalFare}</span>
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
          <div className="card-payment">
            <div className="card-number-input">
              <label>Card Number</label>
              <input
                type="text"
                placeholder="Card Number"
                className="input-field"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
            </div>

            <div className="card-holder-name-input">
              <label>Card Holder Name</label>
              <input
                type="text"
                placeholder="Card Holder Name"
                className="input-field"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
              />
            </div>

            <div className="card-expiration-cvv">
              <div className="expiration-input">
                <label>Expiration (MM/YYYY)</label>
                <div className="expiration-fields">
                  <input
                    type="text"
                    placeholder="MM"
                    className="input-field small"
                    value={expMonth}
                    onChange={(e) => setExpMonth(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="YYYY"
                    className="input-field small"
                    value={expYear}
                    onChange={(e) => setExpYear(e.target.value)}
                  />
                </div>
              </div>

              <div className="cvv-input">
                <label>CVV</label>
                <input
                  type="text"
                  placeholder="CVV"
                  className="input-field small"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                />
              </div>
            </div>

            <div className="total-fare">
              <span>Total Fare: </span>
              <span className="fare-amount">₹ {totalFare}</span>
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

export default BusPayment;
