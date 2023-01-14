import React from "react";
import styles from "./PhotoCarousel.module.css";
import { useTranslation } from "react-i18next";

const PhotoCarousel = () => {
  const { t } = useTranslation();
  let photo = `${process.env.PUBLIC_URL}/assets/images/photo-5.jpg`;

  return (
    <div className={`${styles.photoCarousel} card`}>
      <p className={styles.title}>{t("marriageAnnouncement")}</p>
      <div className="layerCarousel">
        <img
          className={styles.weddingCarousel}
          src={photo}
          alt="wedding-carousel"
        />
      </div>
      <div className="photoCreditBox carousel">
        <p className="photoCredit">
          Photo by{" "}
          <a
            href="https://unsplash.com/@huuduong?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
            className="link"
            target="_blank"
            rel="noreferrer"
          >
            Dương Hữu
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

export default PhotoCarousel;
