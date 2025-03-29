import styles from "./Accordion.module.scss";
import AccordionElement from "../../molecules/AccordionElement/AccordionElement";
import { FC, useState } from "react";
import { Issues } from "../../../types/issueTypes";

interface AccordionProps {
  issues: Issues[];
  slice?: number;
}

const Accordion: FC<AccordionProps> = ({ issues, slice }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const accordionHendler = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.accordion}>
      {issues.slice(0, slice).map((elem, i) => {
        return (
          <AccordionElement
            key={elem.id}
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
