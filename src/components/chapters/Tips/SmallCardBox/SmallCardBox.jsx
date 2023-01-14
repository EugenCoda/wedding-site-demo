import styles from "./SmallCardBox.module.css";
import { useTranslation } from "react-i18next";
import { AiFillStar } from "react-icons/ai";

const SmallCardBox = ({
  image,
  title,
  details,
  mapLink,
  number,
  singleItem,
  foodStyles,
  rating,
}) => {
  const { t } = useTranslation();
  return (
    <div
      className={
        singleItem ? styles.smallCardBoxSingleItem : styles.smallCardBox
      }
    >
      <div className={styles.smallCardBoxImageContainer}>
        <a href={mapLink} target="_blank" rel="noreferrer">
          <img
            src={image}
            alt={t(title)}
            className={styles.smallCardBoxImage}
          />
        </a>
      </div>
      <div className={styles.smallCardBoxDescriptionContainer}>
        {singleItem ? (
          <h3>{t(title)}</h3>
        ) : (
          <h3>{`${number + 1}. ${t(title)}`}</h3>
        )}
        {rating && (
          <div className={styles.smallCardBoxRating}>
            <span>{rating}</span>
            <AiFillStar />
          </div>
        )}
        {foodStyles && (
          <p>
            {foodStyles.map((foodStyle, index) => {
              return index < foodStyles.length - 1
                ? `${t(foodStyle)}, `
                : `${t(foodStyle)}`;
            })}
          </p>
        )}
        {details && !singleItem && <p>{t(details)}</p>}
        {details && singleItem && details.map((detail) => <p>{t(detail)}</p>)}
        <div className="map">
          <a className="link" target="_blank" rel="noreferrer" href={mapLink}>
            {t("viewMap")}
          </a>
        </div>
      </div>
    </div>
  );
};

export default SmallCardBox;
