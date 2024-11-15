import React, { useEffect, useRef, useContext } from 'react';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import * as echarts from 'echarts';
import ThemeContext from '../../components/ThemeContext/ThemeContext';
import './StatisticsModal.module.css';

const StatisticsModal = ({ visible, onClose, data, dataType }) => {
  const chartRef = useRef(null);
  const { themeMode } = useContext(ThemeContext);
  useEffect(() => {
    let myChart = null;

    if (visible && data && data.length > 0) {
      const initializeChart = () => {
        const chartDom = document.getElementById('statisticsChart');

        if (!chartRef.current) {
          myChart = echarts.init(chartDom);
          chartRef.current = myChart;
        } else {
          myChart = chartRef.current;
        }

        const names = data.map(item => item.name); 
        const counts = data.map(item => item.totalSold || item.PurchaseCount); 

        const maxCount = Math.max(...counts);

        const option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            formatter: (params) => {
              return `${params[0].name}: ${params[0].value}`;
            }
          },
          xAxis: {
            type: 'category',
            data: names,
            axisLabel: {
              interval: 0,
              rotate: -45
            }
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: counts.map((count) => ({
              value: count,
              itemStyle: {
                color: count === maxCount ? '#a90000' : undefined,
              },
              label: {
                show: true,
                position: 'top',
                formatter: '{c}',
              },
            })),
            type: 'bar',
          }],
        };

        myChart.setOption(option);
      };
      setTimeout(initializeChart, 200); 
    }

    return () => {
      if (myChart) {
        myChart.dispose(); 
        chartRef.current = null; 
      }
    };
  }, [visible, data]);

  const customStyle = {
    backgroundColor: themeMode === 'dark' ? '#1a1a1a' : '#ffffff',
    color: themeMode === 'dark' ? '#ffffff' : '#1a1a1a',
    padding: '20px',
    width: '60%',
    top: '10%',
    height: 'fit-content',
    maxWidth: '50rem',
  };

  return (
    <Rodal customStyles={customStyle} visible={visible} onClose={onClose}>
      <div id="statisticsChart" className='container-statisticsChart' style={{ width: '100%', height: '400px' }}></div>
    </Rodal>
  );
};

export default StatisticsModal;