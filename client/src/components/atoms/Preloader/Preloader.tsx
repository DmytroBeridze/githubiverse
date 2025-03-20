import styles from "./Preloader.module.scss";
import preloader from "../../../resources/preloader.gif";
import { FC } from "react";

interface PreloaderProps {
  className?: string;
}

const Preloader: FC<PreloaderProps> = ({ className }) => {
  return (
    <div className={`${styles.preloader} ${className}`}>
      <img src={preloader} alt="preloader" />
    </div>
  );
};

export default Preloader;
