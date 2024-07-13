import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../styles/App.css";
import Flights from "./FLIGHTS/Flights";
import Hotels from "./HOTELS/Hotels";
import Train from "./TRAINS/Train";
import Bus from "./BUS/Bus";
import Login from "./LOGIN/Login";
import HomePage from "./HomePage/HomePage";
import FlightBooking from "./FLIGHTS/BookingFolder/FlightBooking";
import Applayout from "./Applayout";
import { OfferProvider } from "../Context/OffersContext";
import { FlightsMainProvider } from "../Context/Flights/FlightsMainContext";
import { FlightIndiudvalProvider } from "../Context/Flights/FlightIndiudvalContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { HotelIndiudvalProvider } from "../Context/Hotels/HotelIndiudvalContext";
import { HotelMainProvider } from "../Context/Hotels/HotelMainContext";
import { TrainMainProvider } from "../Context/Trains/TrainMainContext";
function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <OfferProvider>
        <FlightIndiudvalProvider>
          <FlightsMainProvider>
            <HotelIndiudvalProvider>
              <HotelMainProvider>
                <TrainMainProvider>
                  <div className="App">
                    <BrowserRouter>
                      <ReactQueryDevtools initialIsOpen={false} />
                      <Routes>
                        <Route element={<Applayout />}>
                          <Route path="/" element={<Flights />} />
                          <Route path="/Hotel" element={<Hotels />} />
                          <Route path="/Train" element={<Train />} />
                          <Route path="/Bus" element={<Bus />} />
                          <Route path="/Login" element={<Login />} />
                          <Route path="/HomePage" element={<HomePage />} />
                          <Route
                            path="/FlightBooking"
                            element={<FlightBooking />}
                          />
                        </Route>
                      </Routes>
                    </BrowserRouter>
                  </div>
                </TrainMainProvider>
              </HotelMainProvider>
            </HotelIndiudvalProvider>
          </FlightsMainProvider>
        </FlightIndiudvalProvider>
      </OfferProvider>
    </QueryClientProvider>
  );
}

export default App;
