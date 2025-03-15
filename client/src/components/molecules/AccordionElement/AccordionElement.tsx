import Icon from "../../atoms/Icon/Icon";
import styles from "./AccordionElement.module.scss";
import { FC, memo, useEffect, useState } from "react";
import { Comments, Issues } from "../../../types/issueTypes";
import useSearchService from "../../../servises/useSearchService";
import CommentItem from "../CommentItem/CommentItem";
import Preloader from "../../atoms/Preloader/Preloader";

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
      linkGit,
    } = data;

    const { getComments, loading, error } = useSearchService();
    const [usersComments, setusersComments] = useState([]);

    useEffect(() => {
      let isMounted = true;

      if (isMounted && isOpen && usersComments.length === 0) {
        getComments(commentsUrl).then((data) => {
          const filteredCOmments = data.filter(
            (elem: Comments) => elem.userType === "User"
          );
          setusersComments(filteredCOmments.slice(0, 5));
        });
      }

      return () => {
        isMounted = false;
      };
    }, [isOpen]);

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
              <li className={`${styles.author} ${isOpen ? styles.active : ""}`}>
                <span>Author:</span>
                {user}
              </li>
              <li className={`${styles.status} ${isOpen ? styles.active : ""}`}>
                <span>Status:</span>
                {state}
              </li>
              <li
                className={`${styles.quantityComments} ${
                  isOpen ? styles.active : ""
                }`}
              >
                <span>Comments:</span>
                {comments}
              </li>
            </ul>
          </div>

          <span
            className={`${styles.iconContainer} ${isOpen ? styles.rotate : ""}`}
          >
            <Icon name="arrowMore" onClick={accordionHendler} />
          </span>
        </div>

        {/* content */}
        {loading ? <Preloader /> : null}
        {error ? "error" : null}

        {!loading && !error && (
          <CommentItem
            usersComments={usersComments}
            createdAt={createdAt}
            fullTitle={fullTitle}
            isOpen={isOpen}
            linkGit={linkGit}
          />
        )}
      </div>
    );
  }
);

export default AccordionElement;
