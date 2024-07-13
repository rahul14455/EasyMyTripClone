import React, { useEffect } from "react";
import { useHotelMainContext } from "../../../Context/Hotels/HotelMainContext";
import { CiSearch } from "react-icons/ci";
import { hotelListWithCityName } from "../../Services/apiHotels";
import HotelPopupList from "./HotelPopupList";
import useHotelList from "./useHotelList";
import "../HotelApiCall/HotelPop.css";
const HotelPopup = () => {
  const { cityName, setCityName, search, setSearch, destination, inputRef } =
    useHotelMainContext();

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  useEffect(() => {
    if (search) setCityName(search);
    if (!search) setCityName(null);
    hotelListWithCityName(cityName);
  }, [search, setCityName, cityName]);
  const { isLoading, hotels } = useHotelList();

  const list = hotels?.data.cities;
  console.log(list);

  return (
    <div className="hotel-popup">
      <div className="searchbox">
        <CiSearch />
        <input
          type="text"
          ref={inputRef}
          placeholder={`Search ${destination}`}
          value={search}
          onChange={(e) => {
            const value = e.target.value;
            if (value.length > 0 && /^[a-zA-Z\s]*$/.test(value)) {
              setSearch(value);
            } else {
              setSearch("");
            }
          }}
        />
      </div>
      <div className="hotel-list">
        {list?.map((item, index) => (
          <HotelPopupList key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default HotelPopup;
