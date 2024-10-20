import React, { useEffect, useState } from "react";
import { hotelListWithCityName } from "../../Services/apiHotels";
import { useHotelMainContext } from "../../../Context/Hotels/HotelMainContext";
import "./HotelRoomCard.css"; // Import the CSS file
import { useLocation, useNavigate } from "react-router-dom";

const HotelRoomCard = ({ priceArr, ratingArr }) => {
  const [data, setData] = useState([]);
  const { cityName, checkInDate, checkOutDate } = useHotelMainContext();
  const [filteredData, setFilteredData] = useState([]);

  const getData = async () => {
    const hotelDataArr = await hotelListWithCityName(cityName);
    setData(hotelDataArr?.data?.hotels);
  };

  console.log(priceArr, data);

  function filterHotelsByPriceAndRating(
    hotelArray,
    selectedPriceRanges,
    selectedRatingRanges
  ) {
    // If no price ranges or rating ranges are selected, return all hotels
    if (selectedPriceRanges.length === 0 && selectedRatingRanges.length === 0) {
      setFilteredData([...hotelArray]);
      return;
    }

    // Define price ranges for each category
    const priceRanges = {
      1: { min: 0, max: 2000 },
      2: { min: 2001, max: 3000 },
      3: { min: 3001, max: 5000 },
      4: { min: 5001, max: 8000 },
      5: { min: 8001, max: Infinity }, // Infinity for prices above 8000
    };

    // Define rating thresholds for each category
    const ratingRanges = {
      1: 3.0, // Above 3 rating
      2: 3.5, // Above 3.5 rating
      3: 4.2, // Above 4.2 rating
    };

    // Step 1: Filter hotels based on selected price ranges
    let filteredByPrice = hotelArray;
    if (selectedPriceRanges.length > 0) {
      filteredByPrice = hotelArray.filter((hotel) => {
        return hotel.rooms.some((room) => {
          return selectedPriceRanges.some((range) => {
            const { min, max } = priceRanges[range];
            return room.costPerNight >= min && room.costPerNight <= max;
          });
        });
      });
    }

    // Step 2: Filter the price-filtered hotels by rating
    let filteredByPriceAndRating = filteredByPrice;
    if (selectedRatingRanges.length > 0) {
      filteredByPriceAndRating = filteredByPrice.filter((hotel) => {
        return selectedRatingRanges.some((range) => {
          return hotel.rating >= ratingRanges[range];
        });
      });
    }

    // Set the filtered data
    setFilteredData(filteredByPriceAndRating);
  }

  useEffect(() => {
    filterHotelsByPriceAndRating(data, priceArr, ratingArr);
  }, [priceArr, data, ratingArr]);

  useEffect(() => {
    getData();
  }, [cityName]);

  const location = useLocation();
  const navigate = useNavigate();

  const HandleRoom = (hotel_id) => {
    navigate("/RoomBooking", {
      state: {
        hotel_id,
      },
    });
  };
  console.log(filteredData, filteredData?.length, ratingArr);

  return (
    <div className="hotel-section">
      <div className="hotel-main">
        {filteredData?.length > 0 ? (
          filteredData.map((hotel, index) => (
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
                      <button
                        onClick={() => {
                          HandleRoom(hotel._id);
                        }}
                      >
                        View Room
                      </button>
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
