export const flightData = async (source, destination, day) => {
  try {
    const sourceFrom = { source: source };
    const destinationTo = { destination: destination };
    const isDay = { day: day };

    const response = await fetch(
      `https://academics.newtonschool.co/api/v1/bookingportals/flight?search={${JSON.stringify(
        sourceFrom
      )},${JSON.stringify(destinationTo)}},${JSON.stringify(isDay)}"`,
      {
        method: "GET",
        headers: {
          projectID: "wniajom2ck2s",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    console.log(flightData);
  }
};
