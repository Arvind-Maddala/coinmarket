import React, { createContext, useContext } from "react";

const Coin = createContext();

const CoinContext = ({ children }) => {
  return <Coin.Provider>{children}</Coin.Provider>;
};

export default CoinContext;

export const CoinState = () => {
    return useContext(Coin)
}