import { FC, useContext, useEffect, useState } from "react";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import { ThemeContext } from "../../../context/ThemeContext";

interface ChartProps {
  data: { name: string; value: number }[];
  outerRadius: number;
  innerRadius: number;
  fontSize: number;
  containerHeight: number;
}

const Chart: FC<ChartProps> = ({
  data,
  outerRadius,
  innerRadius,
  fontSize,
  containerHeight,
}) => {
  const themeContext = useContext(ThemeContext);

  const colors = themeContext?.theme
    ? ["rgb(120, 170, 180)", "#2a9d8f", "#e9c46a"]
    : ["#264653", "#1c7369", "#e76f51"];

  const style = {
    top: "60%",
    // top: "63%",
    lineHeight: "20px",
    fontSize: `${fontSize}px`,
  };

  // const CustomLabel = ({ name, value, percent, x, y }: any) => (
  //   <text x={x} y={y} textAnchor="middle" fontSize="12" fill="#000">
  //     {name}: {value} ({(percent * 100).toFixed(0)}%)
  //   </text>
  // );

  return (
    <ResponsiveContainer width="100%" height={containerHeight}>
      {/* <ResponsiveContainer width="100%" height={285}> */}
      <PieChart width={250} height={180}>
        <Pie
          data={data}
          cx="50%"
          cy="34%"
          outerRadius={outerRadius}
          innerRadius={innerRadius}
          dataKey="value"
          // label={CustomLabel}
          label={outerRadius > 38 ? { fontSize: "10" } : undefined}
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
          formatter={(value, entry) =>
            outerRadius >= 38 ? value : `${value}: ${entry?.payload?.value}`
          }
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default Chart;
