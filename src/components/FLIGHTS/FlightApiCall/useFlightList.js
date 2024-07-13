import { useQuery } from "@tanstack/react-query";
import { flightList } from "../../Services/apiFlights";

const useFlightList = () => {
  const { isLoading, data: flights } = useQuery({
    queryKey: ["flightList"],
    queryFn: flightList,
  });
  return { isLoading, flights };
};

export default useFlightList;
