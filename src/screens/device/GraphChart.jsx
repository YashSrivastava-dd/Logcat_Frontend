import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ChartComponent = (props) => {
  const { title, dataa,peepData, labels, yaxis,tilesDatas, newdataa, label, newlable, dateArr, medicineLable, indexOfMedicine } = props;
  const datasets = [
    {
      label: label?label:'',
      data: dataa?.[0],
      borderColor: label?'blue':'white',
      backgroundColor: label?'rgba(0, 0, 255, 0.1)':'white',
      xAxisID: 'x',
    },
    {
      label: newlable ? newlable : '',
      data: tilesDatas,
      borderColor: newlable ? 'red' : 'white',
      backgroundColor: newlable ? 'rgba(255, 0, 0, 0.1)' : 'white',
      xAxisID: 'x',
    },
    // {
    //   label: labels?.medicineData[0]?.name ?? '',
    //   data: dateArr?.[0] ?? [],
    //   borderColor: medicineLable ? 'green' : 'white',
    //   backgroundColor: medicineLable ? 'rgba(255, 0, 0, 0.1)' : 'white',
    //   xAxisID: 'x',
    // },
    // {
    //   label: labels?.medicineData[indexOfMedicine]?.name ?? '',
    //   data: dateArr?.[indexOfMedicine] ?? [],
    //   borderColor: medicineLable ? 'purple' : 'white',
    //   backgroundColor: medicineLable ? 'rgba(255, 0, 0, 0.1)' : 'white',
    //   xAxisID: 'x',
    // },
    {
      label: medicineLable ? '' : '',
      data: [0, 20, 40, 60, 80, 100,120],
      borderColor: medicineLable ? 'white' : 'white',
      backgroundColor: medicineLable ? 'white' : 'white',
      yAxisID: 'y',
    },
  ];

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title ?? '',
      },
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
      },
    },
  };
  return <Line data={{ labels: yaxis?.[0], datasets }} options={options} />;
};

export default ChartComponent;