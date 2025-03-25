import { FC, useEffect, useRef, useState } from "react";
import { UserWithRepo } from "../../../types/userTypes";
import styles from "./RepositoriesList.module.scss";
import RepositoriesListElement from "../RepositoriesListElement/RepositoriesListElement";
import { RepoType } from "../../../types/repoTypes";
import "overlayscrollbars/overlayscrollbars.css";
import Icon from "../../atoms/Icon/Icon";

interface RepositoriesListProps {
  author: UserWithRepo | null;
  repos: RepoType[];
}

const RepositoriesList: FC<RepositoriesListProps> = ({ author, repos }) => {
  const [showRepo, isShowRepo] = useState<boolean>(false);
  const repositoriesListWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    isShowRepo(false);
  }, [author]);

  if (!author) return null;

  const repoHandler = () => {
    isShowRepo((show) => !show);
    repositoriesListWrapperRef.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={`${styles.repositoriesList}`}>
      <div
        className={`${styles.repositoriesListWrapper} ${
          showRepo ? styles.open : ""
        }`}
        ref={repositoriesListWrapperRef}
      >
        {repos.map((repo) => {
          return <RepositoriesListElement repo={repo} key={repo.id} />;
        })}
      </div>

      <div
        style={{ textAlign: "center" }}
        onClick={repoHandler}
        className={`${styles.iconWrapper} ${showRepo ? styles.open : ""}`}
      >
        <Icon name="arrowMore" />
      </div>
    </div>
  );
};

export default RepositoriesList;
