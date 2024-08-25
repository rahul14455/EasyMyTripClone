import React from "react";
// import { trainCity } from "../Services/apiTrain";
import { useTrainMainContext } from "../../../Context/Trains/TrainMainContext";

const TrainPopup = () => {
  const {} = useTrainMainContext();
  return (
    <div>
      {/* <div className="train-list">
        {trainCity?.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </div> */}
    </div>
  );
};

export default TrainPopup;
