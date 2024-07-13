import { createContext, useContext, useState } from "react";

const TrainIndiudvalContext = createContext();

function TrainIndiudvalProvider({ children }) {
  const [fromtrainCity, setFromTraincity] = useState();
  const [toTrainCity, setToTrainCity] = useState();
  return (
    <TrainIndiudvalContext.Provider
      value={{ fromtrainCity, setFromTraincity, toTrainCity, setToTrainCity }}
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
