import styled from "@emotion/styled";
import axios from "axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { CoinState } from "../../CoinContext";
import { TrendingCoins } from "../../Config/Api";

export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const CarouselItem = styled(Link)({
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  alignItems: "center",
  textTransform: "uppercase",
  color: "#fff",
  cursor: "pointer",
  textDecoration: "none",
});

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const { currency, currencySymbol } = CoinState();
  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrending(data);
  };
  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  console.log(trending);
  const items = trending.map(
    ({
      id,
      name,
      image,
      symbol,
      price_change_percentage_24h,
      current_price,
    }) => {
      let profit = price_change_percentage_24h >= 0;
      return (
        <CarouselItem to={`/coins/${id}`}>
          <img
            src={image}
            alt={name}
            height="50"
            style={{ marginBottom: 10 }}
          />{" "}
          <span>
            {symbol}
            <span
              style={{
                color: profit > 0 ? "rgb(14,203,129)" : "red",
                marginLeft: "0.5rem",
                fontSize: 13,
              }}
            >
              {profit && "+"}
              {price_change_percentage_24h?.toFixed(2)}%{" "}
            </span>{" "}
          </span>
          <span style={{ fontSize: 18, fontWeight: 500 }}>
            {currencySymbol}
            {numberWithCommas(current_price.toFixed(2))}
          </span>
        </CarouselItem>
      );
    }
  );
  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };
  return (
    <div>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items}
      />
    </div>
  );
};

export default Carousel;
