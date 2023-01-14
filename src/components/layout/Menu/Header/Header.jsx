import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import MenuNavLinks from "../MenuNavLinks/MenuNavLinks";
import styles from "../Menu.module.css";
import i18next from "i18next";
import cookies from "js-cookie";
const languages = [
  {
    code: "ro",
    name: "Română",
    country_code: "ro",
  },
  {
    code: "en",
    name: "English",
    country_code: "gb",
  },
];

const Header = ({ handleToggleMenu, openMenu, handleCloseOverlay }) => {
  const currentLanguageCode = cookies.get("i18next") || "en";
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode);
  const [scrollPosition, setScrollPosition] = useState(0);

  window.addEventListener(
    "scroll",
    () => {
      setScrollPosition(
        window.pageYOffset || document.documentElement.scrollTop
      );
    },
    false
  );

  return (
    <header
      className={
        scrollPosition > 530
          ? `${styles.header} ${styles.headerSticky}`
          : `${styles.header}`
      }
    >
      <div className={styles.hamburgerIcon} onClick={handleToggleMenu}>
        {openMenu ? <IoClose /> : <GiHamburgerMenu />}
      </div>
      <div className={styles.siteTitle} onClick={handleCloseOverlay}>
        <a href="#anchor-top">Rebecca & John</a>
      </div>

      <div
        className={
          currentLanguage.code === "en"
            ? styles.headerLinksEn
            : styles.headerLinks
        }
      >
        <MenuNavLinks />
      </div>
      <button
        className={styles.languageSelectorBtn}
        type="button"
        id="languageSelector"
        onClick={() => {
          i18next.changeLanguage(currentLanguage.code === "en" ? "ro" : "en");
        }}
      >
        <img
          src={`${process.env.PUBLIC_URL}/assets/images/flags/${
            currentLanguage.code === "en" ? "ro" : "gb"
          }.svg`}
          alt="language flag"
        />
      </button>
    </header>
  );
};

export default Header;
