import styles from "./Accordion.module.scss";
import AccordionElement from "../../molecules/AccordionElement/AccordionElement";
import { FC, useState } from "react";
import { Issues } from "../../../types/issueTypes";

interface AccordionProps {
  randomIssues: Issues[];
}

const Accordion: FC<AccordionProps> = ({ randomIssues }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const accordionHendler = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.accordion}>
      {randomIssues.slice(0, 3).map((elem, i) => {
        const { title } = elem;
        return (
          <AccordionElement
            key={title}
            accordionHendler={() => accordionHendler(i)}
            isOpen={openIndex === i}
            data={elem}
          />
        );
      })}
    </div>
  );
};

export default Accordion;
