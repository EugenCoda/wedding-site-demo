import { useState } from "react";
import Header from "./Menu/Header/Header";
import MenuOverlay from "./Menu/MenuOverlay/MenuOverlay";
import styles from "./Layout.module.css";

const Layout = (props) => {
  const [openMenu, setOpenMenu] = useState(false);
  const handleToggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  const handleCloseOverlay = () => {
    setOpenMenu(false);
  };
  return (
    <div className={styles.app} id="anchor-top">
      <Header
        handleToggleMenu={handleToggleMenu}
        openMenu={openMenu}
        handleCloseOverlay={handleCloseOverlay}
      />
      {openMenu && <MenuOverlay handleCloseOverlay={handleCloseOverlay} />}
      <main className={styles.main}>{props.children}</main>
    </div>
  );
};

export default Layout;
