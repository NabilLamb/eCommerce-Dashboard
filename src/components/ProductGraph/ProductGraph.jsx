import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import { useTranslation } from "react-i18next";

const ProductGraph = ({ product }) => {
  const [graphData, setGraphData] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    if (product && Array.isArray(product.totalSoldMonths)) {
      setGraphData(product.totalSoldMonths);
    } else {
      // Handle case where product or totalSoldMonths data is missing or invalid
      console.error("Invalid product data or totalSoldMonths data missing.");
      setGraphData([]);
    }
  }, [product]);

  const option = {
    tooltip: {
      trigger: "axis",
      position: function (pt) {
        return [pt[0], "10%"];
      },
    },
    title: {
      left: "center",
      text: t("mix.TotalSoldTime"),
      textStyle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#bababa",
      },
    },

    xAxis: {
      type: "time",
      boundaryGap: false,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: graphData,
        type: "line",
        smooth: true,
      },
    ],
  };

  // Ensure the graph is rendered only when graphData is available
  if (graphData.length === 0) {
    return <div>Error: No data available for graph.</div>;
  }

  return (
    <ReactECharts option={option} style={{ height: "400px", width: "100%" }} />
  );
};

export default ProductGraph;
