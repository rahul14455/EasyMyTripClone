import { createContext, useState, useContext } from "react";
import useHotelList from "../../components/HOTELS/HotelApiCall/useHotelList";

const HotelIndiudvalContext = createContext();

function HotelIndiudvalProvider({ children }) {
  const { isLoading, hotels } = useHotelList();
  const [cityName, setCityName] = useState(null);
  return (
    <HotelIndiudvalContext.Provider
      value={{ isLoading, hotels, cityName, setCityName }}
    >
      {children}
    </HotelIndiudvalContext.Provider>
  );
}

function useHotelIndiudvalContext() {
  const context = useContext(HotelIndiudvalContext);
  if (context === undefined) {
    throw new Error(
      "HotelIndiudvalContext was used outside of HotelIndiudvalProvider"
    );
  }
  return context;
}
export { HotelIndiudvalProvider, useHotelIndiudvalContext };
