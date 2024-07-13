import { useQuery } from "@tanstack/react-query";
import { hotelList } from "../../Services/apiHotels";

const useHotelList = () => {
  const { isLoading, data: hotels } = useQuery({
    queryKey: ["hotelList"],
    queryFn: hotelList,
  });
  return { isLoading, hotels };
};

export default useHotelList;
