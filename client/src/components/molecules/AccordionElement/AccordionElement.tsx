import Icon from "../../atoms/Icon/Icon";
import styles from "./AccordionElement.module.scss";
import { FC, memo, useEffect, useState } from "react";
import { Comments, GitIssues, Issues } from "../../../types/issueTypes";
import useSearchService from "../../../servises/useSearchService";

interface AccordionElementProps {
  accordionHendler: () => void;
  isOpen: boolean;
  data: Issues;
}

const AccordionElement: FC<AccordionElementProps> = memo(
  ({ accordionHendler, isOpen, data }) => {
    const {
      avatar,
      user,
      title,
      state,
      comments,
      fullTitle,
      commentsUrl,
      createdAt,
    } = data;
    const { getComments, loading, error } = useSearchService();
    const [usersComments, setusersComments] = useState([]);

    useEffect(() => {
      if (isOpen && usersComments.length === 0) {
        getComments(commentsUrl).then((data) => setusersComments(data));
      }
    }, [isOpen]);

    console.log(usersComments);

    return (
      <div>
        <div
          className={`${styles.accordionElement} ${isOpen ? styles.open : ""}`}
        >
          <div className={styles.avatar}>
            <img src={avatar} alt="user" />
          </div>
          <div className={styles.body}>
            <h4 className={styles.header}>{title}</h4>
            <ul>
              <li className={styles.author}>Author: {user} </li>
              <li className={styles.status}>Status: {state}</li>
              <li className={styles.quantityComments}>Comments:{comments}</li>
            </ul>
          </div>

          <span
            className={`${styles.imgContainer} ${isOpen ? styles.rotate : ""}`}
          >
            <Icon name="arrowMore" size="30" onClick={accordionHendler} />
          </span>
        </div>

        {/* content */}
        <div className={`${styles.content}  ${isOpen ? styles.open : ""}`}>
          <div className={styles.fullTitle}>{fullTitle}</div>
          <div className={styles.created}>{createdAt}</div>
          <ul>
            {usersComments.map((elem: Comments) => {
              const { body, avatar, userLogin, createdAt } = elem;

              return (
                <li>
                  <div className={styles.contentAvatarContainer}>
                    <img src={avatar} alt="" />
                  </div>
                  {body}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
);

export default AccordionElement;
