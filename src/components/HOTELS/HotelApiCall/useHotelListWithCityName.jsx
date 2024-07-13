import { useQuery } from "@tanstack/react-query";
import { hotelListWithCityName } from "../../Services/apiHotels";
import { useHotelMainContext } from "../../../Context/Hotels/HotelMainContext";

const useHotelListWithCityName = () => {
  const { cityName } = useHotelMainContext();

  const { isLoading, data: hotelsByCityName } = useQuery({
    queryKey: ["hotelListWithCityName", cityName],
    queryFn: () => hotelListWithCityName(cityName),
  });
  return { isLoading, hotelsByCityName };
};

export default useHotelListWithCityName;
