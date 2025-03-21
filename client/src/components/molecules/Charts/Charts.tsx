import { FC } from "react";
import { Issues } from "../../../types/issueTypes";
import Chart from "../../atoms/Chart/Chart";
import styles from "./Charts.module.scss";

interface ChartsProps {
  followers: number;
  following: number;
  publicRepos: number;
  pullReq: Issues[];
  issue: Issues[];
}

const Charts: FC<ChartsProps> = ({
  followers,
  following,
  pullReq,
  issue,
  publicRepos,
}) => {
  const chartData = [
    { name: "followers", value: followers },
    { name: "following", value: following },
  ];
  const chartData2 = [
    { name: "pull requests", value: pullReq.length },
    { name: "issues", value: issue.length },
    { name: "repositories", value: publicRepos },
  ];

  return (
    <div className={styles.chart}>
      <Chart data={chartData} />
      <Chart data={chartData2} />
    </div>
  );
};

export default Charts;
