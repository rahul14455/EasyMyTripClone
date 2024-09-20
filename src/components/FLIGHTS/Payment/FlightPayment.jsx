import React, { useState } from "react";
import "../Payment/FlightPayment.css";
import qrcode from "../Payment/QRCode.png";
import { useLocation } from "react-router-dom";

const FlightPayment = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("upi");

  const location = useLocation();

  const { ticketPrice } = location.state || {};
  // State for UPI and Card inputs
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expMonth, setExpMonth] = useState("");
  const [expYear, setExpYear] = useState("");
  const [cvv, setCvv] = useState("");

  // Validation logic for UPI
  const isUpiPaymentValid = upiId.trim() !== "";

  // Validation logic for card payment
  const isCardPaymentValid =
    cardNumber.length === 16 &&
    /^[0-9]+$/.test(cardNumber) && // Checks if card number is all digits and 16 characters long
    cardName.trim() !== "" &&
    expMonth.length === 2 &&
    /^[0-9]+$/.test(expMonth) && // Ensures month is numeric
    expYear.length === 4 &&
    /^[0-9]+$/.test(expYear) && // Ensures year is numeric
    cvv.length === 3 &&
    /^[0-9]+$/.test(cvv); // Ensures CVV is 3 numeric digits
  console.log({ ticketPrice });

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
              <span className="fare-amount">₹ {ticketPrice}</span>
            </div>
            <button
              type="submit"
              className="upi-payment-btn"
              disabled={!isUpiPaymentValid} // Disable button if UPI ID is invalid
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
                  placeholder="Enter Your Name On Card"
                  className="input-field"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                />
              </div>
              <div className="form-group expiration-group">
                <div>
                  <label htmlFor="expMonth">Month</label>
                  <input
                    type="text"
                    id="expMonth"
                    placeholder="MM"
                    className="input-small"
                    value={expMonth}
                    onChange={(e) => setExpMonth(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="expYear">Year</label>
                  <input
                    type="text"
                    id="expYear"
                    placeholder="YYYY"
                    className="input-small"
                    value={expYear}
                    onChange={(e) => setExpYear(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="cvv">CVV</label>
                  <input
                    type="text"
                    id="cvv"
                    placeholder="CVV"
                    className="input-small"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                  />
                </div>
              </div>

              <div className="total-fare">
                <span>Total Fare: </span>
                <span className="fare-amount">₹ {ticketPrice}</span>
              </div>

              <button
                type="submit"
                className="make-payment-btn"
                disabled={!isCardPaymentValid} // Disable button if card details are invalid
              >
                Make Payment
              </button>

              <p className="terms">
                By continuing to pay, I understand and agree with the
                <a href="#">privacy policy</a>, the{" "}
                <a href="#">user agreement</a>, and{" "}
                <a href="#">terms of service</a>.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightPayment;
