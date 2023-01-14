import React from "react";
import styles from "./Ceremony.module.css";
import { useTranslation } from "react-i18next";

const Ceremony = () => {
  const { t } = useTranslation();
  return (
    <div
      id="anchor-ceremony"
      className={`${styles.ceremonyWrapper} ceremony card`}
    >
      <div className={styles.civilCeremonyCard}>
        <div className={`${styles.civilCeremonyImage} layer`}>
          <img
            className="photo photoCeremony"
            src={`${process.env.PUBLIC_URL}/assets/images/photo-4.jpg`}
            alt="photoCeremony"
          />
        </div>

        <h2>{t("civilCeremony")}</h2>
        <h3>{t("civilCeremonyStart")}</h3>
        <p>{t("civilRecemonyLocationName")}</p>
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
      </div>

      <div className={styles.churchCeremonyCard}>
        <div className={`${styles.churchCeremonyImage} layer`}>
          <img
            className="photo photoCeremony"
            src={`${process.env.PUBLIC_URL}/assets/images/photo-2.jpg`}
            alt="photoCeremony"
          />
        </div>

        <h2>{t("churchCeremony")}</h2>
        <h3>{t("churchCeremonyStart")}</h3>
        <p>{t("churchName")}</p>
        <p>{t("churchAddress")}</p>
        <div className="map mapCeremony">
          <a
            className="link"
            target="_blank"
            rel="noreferrer"
            href="https://www.google.com/maps/place/Isodia+Theotokou+Church/@37.8331533,23.7983671,17z/data=!3m1!4b1!4m5!3m4!1s0x14a195239c884957:0xc75105bd3740ac2f!8m2!3d37.8331492!4d23.8025616"
          >
            {t("viewMap")}
          </a>
        </div>
      </div>
      <div className="photoCreditBox">
        <p className="photoCredit">
          Ceremony Photo by{" "}
          <a
            href="https://unsplash.com/ja/@shardayyy?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
            className="link"
            target="_blank"
            rel="noreferrer"
          >
            Shardayyy Photography
          </a>{" "}
          on{" "}
          <a
            href="https://unsplash.com/s/photos/wedding-ceremony?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
            className="link"
            target="_blank"
            rel="noreferrer"
          >
            Unsplash
          </a>
        </p>
        <p className="photoCredit">
          Church Photo by{" "}
          <a
            href="https://unsplash.com/@wedding_photography?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
            className="link"
            target="_blank"
            rel="noreferrer"
          >
            Wedding Photography
          </a>{" "}
          on{" "}
          <a
            href="https://unsplash.com/s/photos/wedding-ceremony-church?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
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

export default Ceremony;
