import styles from "./DevFinder.module.scss";
import { useEffect } from "react";
import { ContentContainer } from "../../organisms/ContentContainer";
import { useScrollToTop } from "../../../hooks/useScrollToTop";
import useSearchService from "../../../servises/useSearchService";

export const DevFinder = () => {
  const {
    loading,
    error,
    status,
    clearError,
    getUserByName,
    author,
    repos,
    issue,
    pullReq,
  } = useSearchService();
  useScrollToTop();

  useEffect(() => {
    getUserByName();
  }, []);
  console.log("author:", author);
  console.log("repos:", repos);
  console.log("pullReq:", pullReq);
  console.log("issue:", issue);

  return <ContentContainer>DevFinder</ContentContainer>;
};
