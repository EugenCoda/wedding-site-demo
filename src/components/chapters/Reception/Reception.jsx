import React from "react";
import styles from "./Reception.module.css";
import { useTranslation } from "react-i18next";

const Reception = () => {
  const { t } = useTranslation();
  return (
    <div id="anchor-reception" className="reception card">
      <div className="layer">
        <img
          className={`photo ${styles.photoReception}`}
          src={`${process.env.PUBLIC_URL}/assets/images/photo-3.jpg`}
          alt="photoReception"
        />
      </div>

      <h2>{t("Reception")}</h2>
      <h3>{t("receptionStart")}</h3>
      <p>{t("restaurantName")}</p>
      <p>{t("restaurantAddress")}</p>
      <div className="map">
        <a
          className="link"
          target="_blank"
          rel="noreferrer"
          href="https://www.google.com/maps/place/Amaltheia+The+Place/@37.8672608,23.8818345,17z/data=!3m1!4b1!4m5!3m4!1s0x14a1952c7e4f0b59:0xdeae582110168b08!8m2!3d37.8672566!4d23.8840232"
        >
          {t("viewMap")}
        </a>
      </div>
      <div className="photoCreditBox">
        <p className="photoCredit">
          Photo by{" "}
          <a
            href="https://unsplash.com/@scottbroomephotography?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
            className="link"
            target="_blank"
            rel="noreferrer"
          >
            Scott Broome
          </a>{" "}
          on{" "}
          <a
            href="https://unsplash.com/s/photos/couple?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
            className="link"
            target="_blank"
            rel="noreferrer"
          >
            Unsplash
          </a>
        </p>
      </div>
    </div>
  );
};

export default Reception;
