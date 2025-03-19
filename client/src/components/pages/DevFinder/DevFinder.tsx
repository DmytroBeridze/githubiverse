import styles from "./DevFinder.module.scss";
import { useEffect } from "react";
import { ContentContainer } from "../../organisms/ContentContainer";
import { useScrollToTop } from "../../../hooks/useScrollToTop";
import useSearchService from "../../../servises/useSearchService";
import useIssueService from "../../../servises/useIssueService";
import useRepositoriesService from "../../../servises/useRepositoriesService";
import useUserSearch from "../../../servises/useUserSearch";

export const DevFinder = () => {
  const { loading, error, status, clearError } = useSearchService();

  const { issue, issuesQuantity, pullReq, pullRequest } = useIssueService();
  const { getRepositories, repos } = useRepositoriesService();
  const { author, getUserByName } = useUserSearch();
  useScrollToTop();

  useEffect(() => {
    // getUserByName("torvalds");
    // getRepositories("torvalds");
    // pullRequest("torvalds");
    // issuesQuantity("karpathy");
    // issuesQuantity("torvalds");
    // getUserByName();
  }, []);
  // console.log(repos);

  return <ContentContainer>DevFinder</ContentContainer>;
};
