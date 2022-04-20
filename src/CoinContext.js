import React, { createContext, useContext, useEffect, useState } from "react";

const Coin = createContext();

const CoinContext = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [currencySymbol, setCurrencySymbol] = useState("₹");

  useEffect(() => {
    if (currency === "INR") setCurrencySymbol("₹");
    else if (currency === "USD") setCurrencySymbol("$");

    return () => {};
  }, [currency]);

  return (
    <Coin.Provider value={{ currency, currencySymbol, setCurrency, setCurrencySymbol }}>
      {children}
    </Coin.Provider>
  );
};

export default CoinContext;

export const CoinState = () => {
  return useContext(Coin);
};
