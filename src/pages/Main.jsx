import React from "react";
import Ceremony from "../components/chapters/Ceremony/Ceremony";
import PhotoCarousel from "../components/chapters/PhotoCarousel/PhotoCarousel";
import Reception from "../components/chapters/Reception/Reception";
import RSVP from "../components/chapters/RSVP/RSVP";
import WeddingDate from "../components/chapters/WeddingDate/WeddingDate";
import Tips from "../components/chapters/Tips/Tips";

const Main = () => {
  return (
    <>
      <PhotoCarousel />
      <WeddingDate />
      <Ceremony />
      <Reception />
      <RSVP />
      <Tips />
    </>
  );
};

export default Main;
