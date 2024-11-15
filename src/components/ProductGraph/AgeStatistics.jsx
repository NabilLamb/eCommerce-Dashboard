import React from "react";
import ReactEcharts from "echarts-for-react";

const AgeStatistics = ({ ageData }) => {
  const option = {
    xAxis: {
      type: "category",
      data: Object.keys(ageData),
    },
    yAxis: {
      type: "value",
    },
    tooltip: {
      trigger: "axis", // Show tooltip when hovering over a data point
      formatter: function (params) {
        // Custom tooltip formatter function
        const age = params[0].name; // Get the age from the hovered point
        const numberOfPeople = params[0].value; // Get the number of people from the hovered point
        return `Age: ${age}<br/>Number of People: ${numberOfPeople}`; // Format tooltip content
      },
    },
    series: [
      {
        data: Object.values(ageData),
        type: "line",
      },
    ],
  };

  return <ReactEcharts option={option} />;
};

export default AgeStatistics;
