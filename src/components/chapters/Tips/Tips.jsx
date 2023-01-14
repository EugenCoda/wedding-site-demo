import { useState } from "react";
import CardBox from "./CardBox/CardBox";
import styles from "./Tips.module.css";
import { useTranslation } from "react-i18next";
import {
  mustVisitArray,
  accommodationArray,
  transportationArray,
  restaurantsArray,
} from "./TipsArrays";

const Tips = () => {
  const { t } = useTranslation();
  const [isExtended, setIsExtended] = useState(false);
  const [openBox, setOpenBox] = useState([false, false, false, false]);

  const handleOpenCardBox = (id) => {
    setOpenBox(
      openBox.map((box, index) =>
        index === +id ? (box = true) : (box = false)
      )
    );
    setIsExtended(!isExtended);
  };

  const handleCloseCardBox = (id) => {
    setOpenBox([false, false, false, false]);
    setIsExtended(!isExtended);
  };

  return (
    <div id="anchor-tips" className="tips card">
      <h2>{t("Tips")}</h2>
      <div
        className={
          isExtended ? styles.cardBoxContainerExtended : styles.cardBoxContainer
        }
      >
        <CardBox
          image={`${process.env.PUBLIC_URL}/assets/images/tips/cards/promotions-summer-travel-season-stimulate-economy-tourism-such-as-hotels-guesthouses-flat-illustration/202102_054.jpg`}
          title={t("accommodation")}
          itemsToDisplay={accommodationArray}
          setIsExtended={setIsExtended}
          isCardBoxOpen={openBox[0]}
          onClick={() => handleOpenCardBox("0")}
          handleCloseCardBox={handleCloseCardBox}
        />
        <CardBox
          image={`${process.env.PUBLIC_URL}/assets/images/tips/cards/transportation/2020_U1RVRElPIFBDIDE3OTctMjI.jpg`}
          title={t("transportation")}
          itemsToDisplay={transportationArray}
          setIsExtended={setIsExtended}
          isCardBoxOpen={openBox[1]}
          onClick={() => handleOpenCardBox("1")}
          handleCloseCardBox={handleCloseCardBox}
        />
        <CardBox
          image={`${process.env.PUBLIC_URL}/assets/images/tips/cards/vecteezy_check-out-this-simple-people-eating-at-restaurant-ilustration_242017/People Eating At Restaurant 1-01.jpg`}
          title={t("restaurants")}
          itemsToDisplay={restaurantsArray}
          setIsExtended={setIsExtended}
          isCardBoxOpen={openBox[2]}
          onClick={() => handleOpenCardBox("2")}
          handleCloseCardBox={handleCloseCardBox}
        />
        <CardBox
          image={`${process.env.PUBLIC_URL}/assets/images/tips/cards/vecteezy_couple-traveling-with-map_3376843/vecteezytraveling-illustrationSS0821_generated.jpg`}
          title={t("mustVisit")}
          itemsToDisplay={mustVisitArray}
          setIsExtended={setIsExtended}
          isCardBoxOpen={openBox[3]}
          onClick={() => handleOpenCardBox("3")}
          handleCloseCardBox={handleCloseCardBox}
        />
      </div>
      <div className="photoCreditBox">
        <p className="photoCredit">
          <a
            href="https://www.vecteezy.com/free-vector/vector"
            className="link"
            target="_blank"
            rel="noreferrer"
          >
            Vector Vectors by Vecteezy
          </a>
        </p>
      </div>
    </div>
  );
};

export default Tips;
