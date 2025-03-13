import { FC, useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./CommentItem.module.scss";
import { Comments } from "../../../types/issueTypes";
import { PrimaryButton } from "../../atoms/PrimaryButton";
import { dateFormatter } from "../../../utils/dateFormatter";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "overlayscrollbars/overlayscrollbars.css";

interface CommentItemProps {
  usersComments: Comments[];
  isOpen: boolean;
  fullTitle: string;
  createdAt: string;
  linkGit: string;
}

const CommentItem: FC<CommentItemProps> = ({
  usersComments,
  isOpen,
  fullTitle,
  createdAt,
  linkGit,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [elementHeight, setElementHeight] = useState<number>(0);

  useEffect(() => {
    if (contentRef.current) {
      setElementHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen]);

  return (
    <div
      ref={contentRef}
      className={`${styles.content}  ${isOpen ? styles.open : ""}`}
      style={{
        height: isOpen ? `${elementHeight}px` : 0,
        transition: "height 0.3s ease-out",
      }}
    >
      {/* issue info */}
      <div className={styles.issueInfo}>
        <div>
          <div className={styles.fullTitle}>
            {fullTitle ? fullTitle[0].toUpperCase() + fullTitle.slice(1) : null}
          </div>
          <div className={styles.created}>
            {dateFormatter(createdAt, "en-US", {
              day: "numeric",
              month: "long",
              weekday: "short",
              year: "numeric",
            })}
          </div>
        </div>
        <a href={linkGit} target="_blank" rel="noopener noreferrer">
          <PrimaryButton className={styles.button}>Open GitHub</PrimaryButton>
        </a>
      </div>
      {/* body */}
      <ul className={styles.commentsList}>
        {usersComments.map((elem: Comments) => {
          const { avatar, body, id, userLogin, createdAt } = elem;
          const date = new Date(createdAt);
          return (
            <li key={id}>
              <div className={styles.contentAvatarContainer}>
                <img src={avatar} alt={userLogin} />
              </div>

              <div className={styles.infoContainer}>
                <div className={styles.info}>
                  <span>{userLogin}</span>
                  <span>
                    {dateFormatter(date, "en-US", {
                      day: "2-digit",
                      month: "numeric",
                      // weekday: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <OverlayScrollbarsComponent
                  className="os-theme-round-dark"
                  options={{
                    scrollbars: {
                      autoHide: "leave",
                    },
                  }}
                  style={{ maxHeight: "50px", overflow: "auto" }}
                >
                  <div className={styles.comment}>{body}</div>
                </OverlayScrollbarsComponent>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CommentItem;
