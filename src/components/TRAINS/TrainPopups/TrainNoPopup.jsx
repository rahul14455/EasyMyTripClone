import React from "react";
import { useTrainMainContext } from "../../../Context/Trains/TrainMainContext";

const TrainNoPopup = (item, destination) => {
  const { setToIndex, setFromIndex } = useTrainMainContext();
  const chooseCity = (index, e, destination) => {
    e.stopPropagation();
    if (destination === "from") {
      setFromIndex("Delhi");
    } else if (destination === "to") {
      setToIndex("Surat");
    }
  };
  return <div></div>;
};

export default TrainNoPopup;
