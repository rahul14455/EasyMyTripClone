export const BusData = async (
  source,
  destination,
  day,
  selectedDuration,
  price,
  selectedStop,
  selectDeparture
) => {
  const travelData = {
    source: source,
    destination: destination,
  };
  let apiVal = `https://academics.newtonschool.co/api/v1/bookingportals/bus?search=${JSON.stringify(
    travelData
  )}&day=${day}&sort=${price}`;

  const filters = {};

  if (selectedDuration) {
    filters.duration = selectedDuration;
  }
  if (selectedStop) {
    filters.stops = selectedStop;
  }
  if (selectDeparture) {
    filters.departureTime = selectDeparture;
  }
  if (price) {
    filters.ticketPrice = { $lte: price };
  }

  if (Object.keys(filters).length > 0) {
    apiVal += `&filter=${JSON.stringify(filters)}`;
  }

  console.log(apiVal);

  try {
    console.log(travelData);
    console.log(price);
    console.log(selectedStop);
    console.log(selectDeparture);
    console.log(JSON.stringify(travelData));
    const response = await fetch(apiVal, {
      method: "GET",
      headers: {
        projectID: "wniajom2ck2s",
      },
    });
    const res = await response.json();
    console.log(res.data);
    return res.data.buses;
  } catch (error) {
    console.error("Error fetching data:", error);
    console.log(BusData);
  }
};
