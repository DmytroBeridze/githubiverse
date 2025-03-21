import styles from "./Chart.module.scss";

import { FC, useContext } from "react";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import { ThemeContext } from "../../../context/ThemeContext";

interface ChartProps {
  data: { name: string; value: number }[];
}

const Chart: FC<ChartProps> = ({ data }) => {
  const themeContext = useContext(ThemeContext);

  const colors = themeContext?.theme
    ? ["rgb(120, 170, 180)", "#2a9d8f", "#e9c46a"]
    : ["#264653", "#1c7369", "#e76f51"];

  const style = {
    top: "90%",
    lineHeight: "20px",
    fontSize: "14px",
  };

  return (
    <ResponsiveContainer width="100%" height={180}>
      <PieChart width={250} height={180}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={50}
          innerRadius={30}
          dataKey="value"
          label={{ fontSize: "12" }}
          //   labelLine={false}
          stroke="none"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index]} />
          ))}
        </Pie>
        <Legend
          iconSize={10}
          layout="vertical"
          verticalAlign="middle"
          wrapperStyle={style}
          //   formatter={(value, entry) => `${value}: ${entry?.payload?.value}`}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default Chart;
