import { url, projectID } from "./urls";
export const hotelList = async () => {
  try {
    const response = await fetch(`${url}/city`, {
      method: "GET",
      headers: {
        projectID: { projectID },
        autorization: `Bearer${localStorage.getItem("token")}`,
      },
    });
    return response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const hotelListWithCityName = async (cityName) => {
  const city = { location: cityName };
  try {
    const response = await fetch(
      `${url}/hotel?search=${JSON.stringify(city)}`,
      {
        method: "GET",
        headers: {
          projectID: { projectID },
          autorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.json();
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};
