import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";

const StatisticsChart = () => {
  const option = {
    color: ["var(--orange)"],
    toolbox: {
      feature: {
        saveAsImage: {},
        // dataZoom: {},
        dataView: {},
        magicType: {
          type: ["line", "bar"], //, "stack"
        },
      },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
      backgourndColor: "rgba(0, 0, 0, 0.59)",
      borderWidth: 0,
    },
    grid: {
      left: "4%",
      right: "4%",
      top: "10%",
      bottom: "10%",
      containLabel: true,
      show: false,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
    ],
    yAxis: [
      {
        type: "value",
        splitLine: { show: false },
      },
    ],
    series: [
      {
        type: "line",
        smooth: true,
        lineStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgb(255, 191, 0)",
            },
            {
              offset: 1,
              color: "#F450D3",
            },
          ]),
          width: 4,
        },
        areaStyle: {
          Opacity: 0.5,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 0.8, [
            {
              offset: 0,
              color: "#FE4C00",
            },
            {
              offset: 1,
              color: "rgba(255, 244, 70, 0.1)",
            },
          ]),
        },
        emphasis: {
          focus: "series",
        },
        showSymbol: true,
        data: [120000, 233000, 980000, 430000, 844000, 620000, 917100],
      },
    ],
  };

  return (
    <div>
      <ReactECharts option={option} />
    </div>
  );
};

export default StatisticsChart;
