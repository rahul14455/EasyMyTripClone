import { createContext, useContext, useState } from "react";

const OffersContext = createContext();

function OfferProvider({ children }) {
  const [type, settype] = useState("ALL");
  const handleFilterChange = (value) => {
    settype(value);
  };
  return (
    <OffersContext.Provider value={{ type, settype, handleFilterChange }}>
      {children}
    </OffersContext.Provider>
  );
}

function useOffersContext() {
  const context = useContext(OffersContext);
  if (context === undefined) {
    throw new Error("OffersContext was used outside of OffersProvider");
  }
  return context;
}
export { useOffersContext, OfferProvider };
