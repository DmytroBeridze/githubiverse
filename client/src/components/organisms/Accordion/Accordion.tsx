import styles from "./Accordion.module.scss";
import AccordionElement from "../../molecules/AccordionElement/AccordionElement";
import { FC, useEffect, useState } from "react";
import { Comments, GitComments, Issues } from "../../../types/issueTypes";
import useSearchService from "../../../servises/useSearchService";
import { transformGitComments } from "../../../utils/transformGitIssueUtils";
import { log } from "node:console";

interface AccordionProps {
  randomIssues: Issues[];
}

const Accordion: FC<AccordionProps> = ({ randomIssues }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const accordionHendler = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  // -------------------
  const { getComments } = useSearchService();
  const [issueComments, setIssueComments] = useState<
    Record<string, Comments[]>
  >({});
  const getIssueComments = async (URLComments: string, nameIssue: string) => {
    if (issueComments[nameIssue]) return;

    const response = await getComments(URLComments);
    if (response) {
      setIssueComments((prevState) => ({
        ...prevState,
        [nameIssue]: response,
      }));
    }
  };

  return (
    <div className={styles.accordion}>
      {randomIssues.map((elem, i) => {
        const { title } = elem;
        return (
          <AccordionElement
            key={title}
            accordionHendler={() => accordionHendler(i)}
            isOpen={openIndex === i}
            data={elem}
            getIssueComments={getIssueComments}
            issueComments={issueComments[elem.title]}
          />
        );
      })}
    </div>
  );
};

export default Accordion;
