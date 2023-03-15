import React, { useState, useEffect } from 'react';
import Chart from '.';

const MyChart = ({ dataChart, lable }) => {
  const [chart, setChart] = useState({
    options: {
      chart: {
        id: 'basic-bar',
      },
      xaxis: {
        categories: lable,
      },
    },
    series: [
      {
        name: 'My Data',
        data: dataChart,
      },
    ],
  });

  return (
    <div>
      <Chart options={chart.options} series={chart.series} type="bar" />
    </div>
  );
};

export default MyChart;
