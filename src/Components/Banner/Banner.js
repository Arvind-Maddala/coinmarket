import { Container, Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";
import img from "../../Images/banner2.jpg";
import Carousel from "./Carousel";

const BgImage = styled("div")({
  backgroundImage: `url(${img})`,
});

const BannerContent = styled(Container)({
  height: 400,
  display: "flex",
  flexDirection: "column",
  paddingTop: 25,
  justifyContent: "space-around",
  color: "#fff",
});
const BannerTagLine = styled("div")({
  height: "40%",
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  alignItems: "center",
});

const StyledCarousel = styled(Carousel)({
  height: "50%",
  display: "flex",
  alignItems: "center",
  color: "#fff",
});

const Banner = () => {
  return (
    <div>
      <BgImage>
        <BannerContent>
          <BannerTagLine>
            <Typography variant="h2"> Coin Market</Typography>
            <Typography variant="subtitle1">
              {" "}
              Get all the info regarding your favourite Crypto currency
            </Typography>
          </BannerTagLine>
          <StyledCarousel />
        </BannerContent>
      </BgImage>
    </div>
  );
};

export default Banner;
