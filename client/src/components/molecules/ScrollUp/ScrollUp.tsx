import styles from "./ScrollUp.module.scss";
import { useEffect, useState } from "react";

import UpBtn from "../../atoms/UpBtn/UpBtn";

const ScrollUp = () => {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const toggle = () => {
      setVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", toggle);
    return () => window.removeEventListener("scroll", toggle);
  }, []);

  return (
    <div
      className={`${styles.scrollUp} ${visible ? styles.visible : ""}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <UpBtn />
    </div>
  );
};

export default ScrollUp;
