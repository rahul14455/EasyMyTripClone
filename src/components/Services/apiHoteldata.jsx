export const HotelData = async (source, price) => {
  const travelData = {
    source: source,
  };

  // Correcting the apiVal template string
  let apiVal = `https://academics.newtonschool.co/api/v1/bookingportals/hotel?search=${JSON.stringify(
    travelData
  )}&sort=${price}`; // Adding the missing "=" sign before ${price}

  const filters = {};

  // Adding a filter for price if it exists
  if (price) {
    filters.ticketPrice = { $lte: price };
  }

  // Append filters to the API URL if filters object has any keys
  if (Object.keys(filters).length > 0) {
    apiVal += `&filter=${JSON.stringify(filters)}`;
  }

  console.log(apiVal); // Logging the final API URL

  try {
    console.log(travelData); // Logging travelData for debugging
    console.log(price); // Logging price for debugging
    console.log(JSON.stringify(travelData)); // Logging the stringified version of travelData

    // Fetching data from the API
    const response = await fetch(apiVal, {
      method: "GET",
      headers: {
        projectID: "wniajom2ck2s", // Ensure you have the correct projectID in headers
      },
    });

    // Parsing response as JSON
    const res = await response.json();
    console.log(res.data); // Logging the full data response for debugging

    // Returning the flights data
    return res.data.hotels;
  } catch (error) {
    console.error("Error fetching data:", error); // Handling and logging errors
    console.log(HotelData); // Logging the function itself for debugging
  }
};
