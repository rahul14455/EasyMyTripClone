import React, { useEffect, useState } from "react";
import { hotelListWithCityName } from "../../Services/apiHotels";
import { useHotelMainContext } from "../../../Context/Hotels/HotelMainContext";
import "./HotelRoomCard.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";

const HotelRoomCard = () => {
  const [data, setData] = useState([]);
  const { cityName } = useHotelMainContext();

  const getData = async () => {
    const hotelDataArr = await hotelListWithCityName(cityName);
    setData(hotelDataArr);
  };

  useEffect(() => {
    getData();
  }, [cityName]);

  const navigate = useNavigate();
  function HandleRoom() {
    navigate("/RoomBooking");
  }

  return (
    <div className="hotel-section">
      <div className="hotel-main">
        {data.data?.hotels.length > 0 ? (
          data.data.hotels.map((hotel, index) => (
            <div key={index} className="hotel-room-card">
              <div className="room-card">
                <img
                  src={hotel.images[0]} // Assuming you want to display the first image
                  alt={hotel.name}
                  className="room-image"
                />
                <div className="room-info">
                  <div className="hotel-details">
                    <h2 className="hotel-name">{hotel.name}</h2>
                    <p className="hotel-location">{hotel.location}</p>
                    <p className="hotel-rating">Rating: {hotel.rating} stars</p>
                    <p className="hotel-amenities">
                      Amenities: {hotel.amenities.join(", ")}
                    </p>
                  </div>
                  <div className="room-pricing">
                    <p className="room-price">
                      Price: ₹{hotel.rooms[0].costDetails.baseCost}
                    </p>
                    <p className="room-taxes">
                      Taxes and Fees: ₹{hotel.rooms[0].costDetails.taxesAndFees}
                    </p>
                    {hotel.rooms[0].costDetails.discount > 0 && (
                      <p className="room-discount">
                        Discount: ₹{hotel.rooms[0].costDetails.discount}
                      </p>
                    )}
                    <div className="view-room">
                      <button onClick={HandleRoom}>View Room</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No Hotels available for the selected route and date.</p>
        )}
      </div>
    </div>
  );
};

export default HotelRoomCard;
