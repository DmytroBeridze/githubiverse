import styles from "./Preloader.module.scss";
import preloader from "../../../resources/preloader.gif";

const Preloader = () => {
  return (
    <div className={styles.preloader}>
      <img src={preloader} alt="preloader" />
    </div>
  );
};

export default Preloader;
