import React from "react";
import { useBusMainContext } from "../../../Context/Bus/BusMainContext";

const BusNoPopup = ({ item, destination }) => {
  const { setToIndex, setFromIndex } = useBusMainContext();
  const chooseCity = (index, e, destination) => {
    e.stopPropagation();
    if (destination === "from") {
      setFromIndex("Delhi");
    } else if (destination === "to") {
      setToIndex("Surat");
    }
  };
  return <div>{item}</div>;
};

export default BusNoPopup;
