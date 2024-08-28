import { createContext, useContext } from "react";

const BusMainContext = createContext();

function BusMainProvider({ children }) {
  return (
    <BusMainContext.Provider value={{}}>{children}</BusMainContext.Provider>
  );
}

function useBusMainContext() {
  const context = useContext(BusMainContext);
  if (context === undefined) {
    throw new Error("BusMainContext was used outside of BusMainProvider");
  }
  return context;
}

export { BusMainProvider, BusMainContext };
