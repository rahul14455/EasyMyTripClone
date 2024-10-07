import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import qrcode from "../../FLIGHTS/Payment/QRCode.png";
import "../HotelPayment/HotelPayment.css";
import BookingConfirmation from "../../NAVBAR/BookingConfirmation";

const HotelPayment = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("upi");
  const location = useLocation();

  const { hotel_id, selectedInDate, selectedOutDate, roomPrice } =
    location.state || {};

  console.log({ roomPrice, hotel_id, selectedInDate, selectedOutDate });

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

  const navigate = useNavigate();

  const Payload = () => {
    navigate("/");

    const bookingData = {
      bookingType: "hotel",
      bookingDetails: {
        hotelId: hotel_id,
        startDate: selectedInDate,
        endDate: selectedOutDate,
      },
    };
    BookingConfirmation(bookingData);
    console.log(bookingData);
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
              <span className="fare-amount">₹ {roomPrice}</span>
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
                  id="expiry-year"
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

              <div className="total-fare">
                <span>Total Fare: </span>
                <span className="fare-amount">₹ {roomPrice}</span>
              </div>
              <button
                type="submit"
                className="payment-btn"
                disabled={!isCardPaymentValid}
                onClick={Payload}
              >
                Make Payment
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelPayment;
