// src/components/CountryStatisticsProduct/CountryStatisticsProduct.jsx

import React, { useEffect } from 'react';
import * as echarts from 'echarts';
import { useTranslation } from "react-i18next";
import styles from './CountryStatisticsProduct.module.css'; // Assuming you have some CSS

const CountryStatisticsProduct = ({ geoData, price }) => {
  const { t } = useTranslation();
  useEffect(() => {
    const chartDom = document.getElementById('country-statistics-chart');
    const myChart = echarts.init(chartDom);

    const countries = Object.keys(geoData);
    const datasetWithFilters = [];
    const seriesList = [];

    countries.forEach(country => {
      const numberOfPurchases = geoData[country].numberOfPurchases;
      const profit = numberOfPurchases * price; // Calculate the profit using passed price

      datasetWithFilters.push({
        id: 'dataset_' + country,
        fromDatasetId: 'dataset_raw',
        transform: {
          type: 'filter',
          config: {
            and: [
              { dimension: 'Country', '=': country }
            ]
          }
        }
      });

      seriesList.push({
        type: 'bar',
        datasetId: 'dataset_' + country,
        showSymbol: false,
        name: country,
        label: {
          show: true,
          position: 'top',
          formatter: params => `$${params.value.Profit.toFixed(2)}`, // Show profit value only
        },
        encode: {
          x: 'Country',
          y: 'Profit',
          itemName: 'Country',
          tooltip: ['Profit']
        }
      });
    });

    const option = {
      // title: {
      //   text: 'Country-wise Sales and Profit',
      //   textStyle: {
      //     color: "#bababa",
      //   }
      // },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        formatter: params => {
          const data = params[0].data;
          return `${t("mix.NumberPurchases")}: ${geoData[data.Country].numberOfPurchases}`;
        }
      },
      dataset: [
        {
          id: 'dataset_raw',
          source: countries.map(country => ({
            Country: country,
            Profit: geoData[country].numberOfPurchases * price // Calculate profit using numberOfPurchases and price
          }))
        },
        ...datasetWithFilters
      ],
      xAxis: {
        type: 'category',
        data: countries,
        nameLocation: 'middle',
        axisLabel: {
          interval: 0,
          rotate: 0,
          margin: 15,
        }
      },
      yAxis: {
        name: 'Profit'
      },
      series: seriesList,
      grid: {
        left: '10%',
        right: '10%',
        bottom: '15%',
        containLabel: true
      }
    };

    myChart.setOption(option);
  }, [geoData, price]);

  return (
    <div className={styles.chartContainer}>
      <div id="country-statistics-chart" className={styles.chart}></div>
    </div>
  );
};

export default CountryStatisticsProduct;
