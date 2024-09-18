import { useEffect, useState } from "react";

export const trainCity = [
  "Delhi Junction",
  "Dhanbad Junction",
  "Surat",
  "Katpadi Junction",
  "Kanpur Central",
  "Kharagpur Junction",
  "Thiruvananthapuram Central",
  "Indore Junction",
  "Chandigarh",
  "Gwalior Junction",
  "Agra Cantonment",
  "Ambala Cantonment",
  "Bhusaval Junction",
  "Manmad Junction",
  "Thrissur",
  "Visakhapatnam Junction",
  "Khurda Road Junction",
  "Ahmedabad Junction",
  "Moradabad Junction",
  "Secunderabad Junction",
  "Nagpur Junction",
  "Howrah Junction",
  "Mysuru Junction",
  "Amritsar Junction",
  "Pune Junction",
  "Raipur Junction",
  "New Delhi",
  "Jhansi Junction",
  "Varanasi Junction",
  "Guwahati",
  "Asansol Junction",
  "Nadiad Junction",
  "Bhopal Junction",
  "Yesvantpur Junction",
  "Kollam Junction",
  "Ludhiana Junction",
  "Bengaluru Cantt",
  "Vijayawada Junction",
  "Warangal",
  "Anand Junction",
  "Hubli Junction",
  "Jodhpur Junction",
];

export const trainData = async (
  source,
  destination,
  day,
  price,
  departure,
  arrival
) => {
  const travelData = {
    source: source,
    destination: destination,
  };

  let apiVal = `https://academics.newtonschool.co/api/v1/bookingportals/train?search=${JSON.stringify(
    travelData
  )}&day=${day}`;

  const filters = {};
  // console.log(travelData);

  if (departure) {
    filters.departureTime = departure;
  }
  if (arrival) {
    filters.arrivalTime = arrival;
  }
  if (price) {
    filters.fare = { $lte: price };
  }

  if (Object.keys(filters).length > 0) {
    apiVal += `&filter=${JSON.stringify(filters)}`;
  }

  console.log(apiVal);

  try {
    const response = await fetch(apiVal, {
      method: "GET",
      headers: {
        projectID: "wniajom2ck2s",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const res = await response.json();
    console.log(res.data);
    return res.data.trains;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
