import React from "react";

export const BookingConfirmation = (payload) => {
  const url = "https://academics.newtonschool.co/api/v1/bookingportals/booking";
  // const payload = {
  //   bookingType: "hotel",
  //   bookingDetails: {
  //     hotelId: "6527dc50de44dd75f5271d99",
  //     startDate: "2024-10-09T10:03:53.554+00:00",
  //     endDate: "2024-10-09T10:03:53.554+00:00",
  //   },
  // };

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Set content type
      projectID: "wniajom2ck2s",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(payload), // Convert payload to JSON
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json(); // Parse JSON response
    })
    .then((data) => {
      console.log("Success:", data); // Handle success
    })
    .catch((error) => {
      console.error("Error:", error); // Handle error
    });

  return <div></div>;
};

export default BookingConfirmation;
