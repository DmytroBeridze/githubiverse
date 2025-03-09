import Icon from "../../atoms/Icon/Icon";
import styles from "./AccordionElement.module.scss";
import fakePhoto from "../../../resources/icons/user.svg";
import { FC } from "react";
import { Issues } from "../../../types/issueTypes";

interface AccordionElementProps {
  accordionHendler: () => void;
  isOpen: boolean;
  data: Issues;
}

const AccordionElement: FC<AccordionElementProps> = ({
  accordionHendler,
  isOpen,
  data,
}) => {
  const { avatar, user } = data;

  return (
    <>
      <div
        className={`${styles.accordionElement} ${isOpen ? styles.open : ""}`}
      >
        <div className={styles.avatar}>
          <img src={avatar} alt="user" />
        </div>
        <div className={styles.body}>
          <h4 className={styles.header}>Header</h4>
          <ul>
            <li className={styles.author}>Author: {user} </li>
            <li className={styles.status}>Status</li>
            <li className={styles.quantityComments}>Comments</li>
          </ul>
        </div>

        <span
          className={`${styles.imgContainer} ${isOpen ? styles.rotate : ""}`}
        >
          <Icon name="arrowMore" size="30" onClick={accordionHendler} />
        </span>
      </div>
      <div className={`${styles.content}  ${isOpen ? styles.open : ""}`}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, quas
        aliquid dolore maxime perferendis facere rerum dolores maiores nulla
        corrupti repellendus iure at tempora cumque est magnam debitis dolorem
        fuga!
      </div>
    </>
  );
};

export default AccordionElement;
