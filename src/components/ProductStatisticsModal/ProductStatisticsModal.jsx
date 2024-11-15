import React, { useEffect } from 'react';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import * as echarts from 'echarts';
import css from './ProductStatisticsModal.module.css';

const ProductStatisticsModal = ({ visible, onClose, product }) => {
  const customStyle = {
    backgroundColor: 'rgb(58, 58, 58)',
    padding: '20px',
    width: '80%', 
    height: 'auto', 
    maxWidth: '40rem',
  };

  useEffect(() => {
    if (visible) {
      const chartDom = document.getElementById('chart');
      const myChart = echarts.init(chartDom);

      const data = [
        ['Year', 'Income'],
        ['2020', product.totalRevenue * 0.8], 
        ['2021', product.totalRevenue * 0.9], 
        ['2022', product.totalRevenue], 
        ['2023', product.totalRevenue * 0.6], 
        ['2024', product.totalRevenue * 0.7], 
      ];

      const option = {
        title: {
          text: `Income of ${product.name} Over Years`,
          left: 'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: data.map(item => item[0])
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            type: 'line',
            data: data.map(item => item[1]),
          },
        ],
      };

      myChart.setOption(option);

      // Resize chart when the window is resized
      window.addEventListener('resize', () => {
        myChart.resize();
      });

      return () => {
        myChart.dispose();
        window.removeEventListener('resize', () => {
          myChart.resize();
        });
      };
    }
  }, [visible, product]);

  return (
    <Rodal customStyles={customStyle} visible={visible} onClose={onClose}>
      <div className={css.container}>
        <div className={css.item}>
          <span className={css.label}>Total Sold: </span>
          <span>{product.totalSold}</span>
        </div>
        <div className={css.item}>
          <span className={css.label}>Total Revenue: </span>
          <span>{product.totalRevenue}</span>
        </div>
        <div className={css.item}>
          <span className={css.label}>Rate: </span>
          <span>{product.rate}</span>
        </div>
        <div id="chart" className={css.chart}></div>
      </div>
    </Rodal>
  );
};

export default ProductStatisticsModal;