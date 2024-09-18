import { createContext, useContext, useState } from "react";
import { trainCity } from "../../components/Services/apiTrain";
import { useTrainMainContext } from "./TrainMainContext";
const TrainIndiudvalContext = createContext();

function TrainIndiudvalProvider({ children }) {
  const [fromtrainCity, setFromTraincity] = useState();
  const [toTrainCity, setToTrainCity] = useState();
  const [cityName, setCityName] = useState(null);
  console.log(fromtrainCity);
  return (
    <TrainIndiudvalContext.Provider
      value={{
        fromtrainCity,
        setFromTraincity,
        toTrainCity,
        setToTrainCity,
        cityName,
        setCityName,
      }}
    >
      {children}
    </TrainIndiudvalContext.Provider>
  );
}

function useTrainIndiudvalContext() {
  const context = useContext(TrainIndiudvalContext);
  if (context === undefined) {
    throw new Error(
      "TrainIndiudvalContext was used outside of TrainIndiudvalProvider"
    );
  }
  return context;
}
export { TrainIndiudvalProvider, useTrainIndiudvalContext };
