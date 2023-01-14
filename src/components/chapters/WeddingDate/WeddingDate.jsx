import React from "react";
import styles from "./WeddingDate.module.css";
import { useTranslation } from "react-i18next";

const WeddingDate = () => {
  const { t } = useTranslation();
  const today = new Date();
  const weddingDay = new Date();
  // Change to the actual wedding day
  weddingDay.setDate(weddingDay.getDate() + 180);

  let diff = weddingDay - today;
  let days = Math.floor(diff / (1000 * 60 * 60 * 24));
  let daysms = days * 1000 * 60 * 60 * 24;
  let hours = Math.floor((diff - daysms) / (1000 * 60 * 60));
  let hoursms = hours * 1000 * 60 * 60;
  let minutes = Math.floor((diff - daysms - hoursms) / (1000 * 60));

  return (
    <div className="date card">
      <div className="layer">
        <img
          className="photo photoWeddingDate"
          src={`${process.env.PUBLIC_URL}/assets/images/photo-1.jpg`}
          alt="photoWeddingDate"
        />
      </div>
      <h2>{weddingDay.toLocaleDateString()}</h2>
      <div className={styles.countdown}>
        <div className={styles.timeBox}>
          <span className={styles.dateNumbers}>{days}</span>
          <span>{t("days")}</span>
        </div>
        <div className={styles.timeBox}>
          <span className={styles.dateNumbers}>{hours}</span>
          <span>{t("hours")}</span>
        </div>
        <div className={styles.timeBox}>
          <span className={styles.dateNumbers}>{minutes}</span>
          <span>{t("minutes")}</span>
        </div>
      </div>
      <div className="photoCreditBox">
        <p className="photoCredit">
          Photo by{" "}
          <a
            href="https://unsplash.com/@jonathanborba?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
            className="link"
            target="_blank"
            rel="noreferrer"
          >
            Jonathan Borba
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

export default WeddingDate;
