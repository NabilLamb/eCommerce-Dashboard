// GenderStatistics.js
import React from "react";
import ReactEcharts from "echarts-for-react";

const GenderStatistics = ({ genderData }) => {
  const option = {
    // title: {
    //   text: "Gender Distribution",
    //   left: "center",
    //   textStyle: {
    //     fontSize: 20, 
    //     fontWeight: "bold", 
    //     color: "#bababa",
    //   },
    // },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "horizontal",
      left: "left",
      textStyle: {
        color: "#bababa",
      },
    },
    series: [
      {
        name: "Gender",
        type: "pie",
        radius: "50%",
        data: Object.entries(genderData).map(([gender, value]) => ({
          value,
          name: gender,
        })),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  return <ReactEcharts option={option} />;
};

export default GenderStatistics;
