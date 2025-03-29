import { FC } from "react";
import { Issues } from "../../../types/issueTypes";
import Chart from "../../atoms/Chart/Chart";
import styles from "./Charts.module.scss";
import useRensponsiveRadius from "../../../hooks/useRensponsiveRadius";

interface ChartsProps {
  followers: number;
  following: number;
  publicRepos: number;
  pullReq: Issues[];
  issue: Issues[];
  className?: string;
}

const Charts: FC<ChartsProps> = ({
  followers,
  following,
  pullReq,
  issue,
  publicRepos,
  className,
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

  const { innerRadius, outerRadius, fontSize, containerHeight } =
    useRensponsiveRadius();

  return (
    <div className={`${styles.charts} ${className}`}>
      {followers || following ? (
        <Chart
          data={chartData}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          fontSize={fontSize}
          containerHeight={containerHeight}
        />
      ) : null}

      {pullReq.length > 0 || issue.length > 0 || publicRepos ? (
        <Chart
          data={chartData2}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          fontSize={fontSize}
          containerHeight={containerHeight}
        />
      ) : null}
    </div>
  );
};

export default Charts;
