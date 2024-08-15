export const flightData = async (source, destination, day) => {
  try {
    const travelData = {
      source: source,
      destination: destination,
    };
    console.log(travelData);
    console.log(JSON.stringify(travelData));
    const response = await fetch(
      `https://academics.newtonschool.co/api/v1/bookingportals/flight?search=${JSON.stringify(
        travelData
      )}&day=${day}`,
      {
        method: "GET",
        headers: {
          projectID: "wniajom2ck2s",
        },
      }
    );
    const res = await response.json();
    console.log(res.data);
    return res.data.flights;
  } catch (error) {
    console.error("Error fetching data:", error);
    console.log(flightData);
  }
};
