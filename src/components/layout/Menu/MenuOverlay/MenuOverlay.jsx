import React from "react";
import MenuNavLinks from "../MenuNavLinks/MenuNavLinks";
import styles from "../Menu.module.css";

const MenuOverlay = ({ handleCloseOverlay }) => {
  return (
    <div className={styles.menuOverlay}>
      <div className={styles.menuOverlayContent}>
        <MenuNavLinks handleCloseOverlay={handleCloseOverlay} />
      </div>
    </div>
  );
};

export default MenuOverlay;
