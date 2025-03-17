import styles from "./UpBtn.module.scss";
import ArrowUp from "../../../resources/icons/up-arrow.png";

const UpBtn = () => {
  return (
    <div className={styles.btn}>
      <img src={ArrowUp} alt="arrow" />
    </div>
  );
};

export default UpBtn;
