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
  if (!cityName) {
    return hotelList();
  }
  const city = { city: cityName };
  try {
    const response = await fetch(`${url}/hotel`, {
      method: "GET",
      headers: {
        projectID: { projectID },
        autorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.json();
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};
