import React from 'react'
import {Line,Doughnut} from "react-chartjs-2"
import { CategoryScale,
  Chart as ChartJs,
  Tooltip,
  Filler,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement ,
  Legend
}from"chart.js";
import { getLast7Days } from '../../lib/features';
import { orange, purple } from '../../constants/color';
const labels=getLast7Days();
ChartJs.register(
   CategoryScale,
  Tooltip,
  Filler,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement ,
  Legend
);
const lineChartOptions={
  responsive:true,
  plugins:{
    legend:{
      display:false,
    },
    title:{
      display:false,
    },
  },
  scales:{
    x:{
grid:{
  display:false,
},
    },
    y:{
beginAtZero:true,
grid:{
  display:false,
}
    }
  }
}

const LineChart = ({value=[]}) => {
  const data={
    labels,
    datasets:[{
      data:value,
      label:"Messages",
      fill:true,
      backgroundColor:"rgba(75,192,192,0.2)",
      borderColor:"rgba(75,12,192,1)",
    },
 
  ],
  }
  return <Line data={data} options={lineChartOptions}/>
}

const DoughnutChartOptions={
  responsive:true,
  plugins:{
    legend:{
      display:false,
    },
  },
  cutout:120,
};
  const DoughnutChart = ({value=[],labels}) => {
    const data={
    labels,
    datasets:[{
      data:value,
      label:"Toatal Chats vs Group Chats",
      backgroundColor:[orange,purple],
      borderColor:[orange,purple],
      offset:40
    },
  ],
  }
  return <Doughnut data={data} options={DoughnutChartOptions}/>
}

export  {LineChart,DoughnutChart}
