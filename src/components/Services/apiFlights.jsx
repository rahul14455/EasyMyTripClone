import { url, projectID } from "./urls";

export const flightList = async () => {
  try {
    const response = await fetch(`${url}/airport`, {
      method: "GET",
      headers: {
        projectID: { projectID },
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const flightListWithCityName = async (cityName) => {
  console.log(cityName);
  if (!cityName) {
    return flightList();
  }
  const city = { city: cityName };
  try {
    const response = await fetch(
      `${url}/airport?search={${JSON.stringify(city)}}`,
      {
        headers: {
          projectID: { projectID },
        },
      }
    );
    return response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
