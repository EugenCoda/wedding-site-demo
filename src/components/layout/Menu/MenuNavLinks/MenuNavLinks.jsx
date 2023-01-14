import React from "react";
import styles from "../Menu.module.css";
import { useTranslation } from "react-i18next";

const MenuNavLinks = ({ handleCloseOverlay }) => {
  const { t } = useTranslation();
  return (
    <>
      <div className={styles.navLink} onClick={handleCloseOverlay}>
        <a href="#anchor-ceremony">{t("churchAndCivilCeremonyNav")}</a>
      </div>
      <div className={styles.navLink} onClick={handleCloseOverlay}>
        <a href="#anchor-reception" onClick={handleCloseOverlay}>
          {t("ReceptionNav")}
        </a>
      </div>
      <div className={styles.navLink} onClick={handleCloseOverlay}>
        <a href="#anchor-rsvp">{t("RSVP")}</a>
      </div>
      <div className={styles.navLink} onClick={handleCloseOverlay}>
        <a href="#anchor-tips">{t("Tips")}</a>
      </div>
    </>
  );
};

export default MenuNavLinks;
