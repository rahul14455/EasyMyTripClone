export const BusCity = [
  "Indore, Madhya Pradesh",
  "Vadodara, Gujarat",
  "Varanasi, Uttar Pradesh",
  "Ghaziabad, Uttar Pradesh",
  "Meerut, Uttar Pradesh",
  "Rajkot, Gujarat",
  "Visakhapatnam, Andhra Pradesh",
  "Thane, Maharashtra",
  "Kanpur, Uttar Pradesh",
  "Delhi, National Capital Territory of Delhi",
  "Vijayawada, Andhra Pradesh",
  "Chennai, Tamil Nadu",
  "Hyderabad, Telangana",
  "Pune, Maharashtra",
  "Ahmedabad, Gujarat",
  "Jaipur, Rajasthan",
  "Lucknow, Uttar Pradesh",
  "Pimpri-Chinchwad, Maharashtra",
  "Patna, Bihar",
  "Ludhiana, Punjab",
  "Agra, Uttar Pradesh",
  "Nashik, Maharashtra",
  "Faridabad, Haryana",
  "Kalyan-Dombivali, Maharashtra",
  "Vasai-Virar, Maharashtra",
  "Kolkata, West Bengal",
  "Surat, Gujarat",
  "Srinagar, Jammu and Kashmir",
  "Dhanbad, Jharkhand",
  "Jodhpur, Rajasthan",
  "Coimbatore, Tamil Nadu",
  "Jabalpur, Madhya Pradesh",
  "Gwalior, Madhya Pradesh",
  "Allahabad, Uttar Pradesh",
  "Raipur, Chhattisgarh",
  "Amritsar, Punjab",
];

export const busData = async (
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

  let apiVal = `https://academics.newtonschool.co/api/v1/bookingportals/bus?search=${JSON.stringify(
    travelData
  )}&day=${day}`;

  const filters = {};
  console.log(travelData);

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
    return res.data.buses;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
