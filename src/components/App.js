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
import { Toaster } from "react-hot-toast";
import HotelBooking from "./HOTELS/HotelBooking/HotelBooking";
import { TrainIndiudvalProvider } from "../Context/Trains/TrainIndiudvalContext";
import TrainBooking from "./TRAINS/TrainBooking/TrainBooking";
import BusBooking from "./BUS/BusBooking/BusBooking";
import { BusMainProvider } from "../Context/Bus/BusMainContext";
import { BusIndiudvalProvider } from "../Context/Bus/BusIndiudvalContext";
import SeatSelection from "./BUS/BusRecords/SeatSelection";
import TrainSeatBooking from "./TRAINS/Records/TrainSeatBooking";
import FlightSeatBooking from "./FLIGHTS/Records/FlightSeatBooking";
import FlightPayment from "./FLIGHTS/Payment/FlightPayment";
import BusRecord from "./BUS/BusRecord/BusRecord";
import BusPayment from "./BUS/Payment/BusPayment";
import TrainPayment from "./TRAINS/Payment/TrainPayment";
import RoomBooking from "./HOTELS/RoomBooking/RoomBooking";
import MyBookings from "./NAVBAR/MyBookings";
import RoomInfo from "./HOTELS/RoomInfo/RoomInfo";
import HotelPayment from "./HOTELS/HotelPayment/HotelPayment";
import { useMediaQuery, ThemeProvider, createTheme } from "@mui/material";

function App() {
  const theme = createTheme(); // Default MUI theme
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <OfferProvider>
          <FlightIndiudvalProvider>
            <FlightsMainProvider>
              <HotelIndiudvalProvider>
                <HotelMainProvider>
                  <TrainIndiudvalProvider>
                    <TrainMainProvider>
                      <BusIndiudvalProvider>
                        <BusMainProvider>
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
                                  <Route
                                    path="/HomePage"
                                    element={<HomePage />}
                                  />
                                  <Route
                                    path="/FlightBooking"
                                    element={<FlightBooking />}
                                  />

                                  <Route
                                    path="/FlightPayment"
                                    element={<FlightPayment />}
                                  />

                                  <Route
                                    path="/HotelBooking"
                                    element={<HotelBooking />}
                                  />
                                  <Route
                                    path="/TrainBooking"
                                    element={<TrainBooking />}
                                  />
                                  <Route
                                    path="/BusBooking"
                                    element={<BusBooking />}
                                  />

                                  <Route
                                    path="/SeatSelection"
                                    element={<SeatSelection />}
                                  />

                                  <Route
                                    path="/TrainSeatBooking"
                                    element={<TrainSeatBooking />}
                                  />

                                  <Route
                                    path="/FlightSeatBooking"
                                    element={<FlightSeatBooking />}
                                  />

                                  <Route
                                    path="/BusRecord"
                                    element={<BusRecord />}
                                  />

                                  <Route
                                    path="/BusPayment"
                                    element={<BusPayment />}
                                  />

                                  <Route
                                    path="/TrainPayment"
                                    element={<TrainPayment />}
                                  />

                                  <Route
                                    path="/RoomBooking"
                                    element={<RoomBooking />}
                                  />

                                  <Route
                                    path="/MyBookings"
                                    element={<MyBookings />}
                                  />

                                  <Route
                                    path="/Roominfo"
                                    element={<RoomInfo />}
                                  />

                                  <Route
                                    path="/HotelPayment"
                                    element={<HotelPayment />}
                                  />
                                </Route>
                              </Routes>
                            </BrowserRouter>
                          </div>
                          <Toaster
                            position="top-center"
                            gutter={12}
                            containerStyle={{ margin: "8px" }}
                            toastOptions={{
                              success: { duration: 3000 },
                              error: { duration: 5000 },
                              style: {
                                fontSize: "text-base",
                                maxWidth: "500px",
                                padding: "16px 24px",
                                backgroundColor: "rgb(249 250 251)",
                                color: "rgb(55 65 81)",
                              },
                            }}
                          />
                        </BusMainProvider>
                      </BusIndiudvalProvider>
                    </TrainMainProvider>
                  </TrainIndiudvalProvider>
                </HotelMainProvider>
              </HotelIndiudvalProvider>
            </FlightsMainProvider>
          </FlightIndiudvalProvider>
        </OfferProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
