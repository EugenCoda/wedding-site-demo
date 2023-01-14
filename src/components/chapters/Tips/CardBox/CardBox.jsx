import styles from "./CardBox.module.css";
import { IoClose } from "react-icons/io5";
import SmallCardBox from "../SmallCardBox/SmallCardBox";

const CardBox = ({
  image,
  title,
  itemsToDisplay,
  isCardBoxOpen,
  onClick,
  handleCloseCardBox,
}) => {
  return (
    <div
      className={
        isCardBoxOpen
          ? `${styles.cardBoxOpen} ${styles.cardBox}`
          : styles.cardBox
      }
      onClick={!isCardBoxOpen ? onClick : undefined}
    >
      <div
        className={
          isCardBoxOpen
            ? `${styles.cardBoxHeaderOpen} ${styles.cardBoxHeader}`
            : styles.cardBoxHeader
        }
      >
        <img src={image} alt={title} className={styles.cardBoxImage} />
        <h3>{title}</h3>
        {isCardBoxOpen && (
          <div className={styles.cardBoxCloseIcon} onClick={handleCloseCardBox}>
            <IoClose />
          </div>
        )}
      </div>
      {isCardBoxOpen && (
        <div className={styles.cardBoxContent}>
          {itemsToDisplay.map((item, index) => {
            return (
              <SmallCardBox
                key={index}
                number={index}
                singleItem={itemsToDisplay.length === 1}
                title={item.title}
                details={item.details}
                image={item.image}
                mapLink={item.mapLink}
                rating={item.rating}
                foodStyles={item.foodStyles}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CardBox;
