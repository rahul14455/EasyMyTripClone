import { useQuery } from "@tanstack/react-query";
import { flightListWithCityName } from "../../Services/apiFlights";
import { useFlightsMainContext } from "../../../Context/Flights/FlightsMainContext";

const useFlightListWithCityName = () => {
  const { cityName } = useFlightsMainContext();
  const { isLoading, data: flightsByCityName } = useQuery({
    queryKey: ["flightListWithCityName", cityName],
    queryFn: () => flightListWithCityName(cityName),
  });
  return { isLoading, flightsByCityName };
};

export default useFlightListWithCityName;
