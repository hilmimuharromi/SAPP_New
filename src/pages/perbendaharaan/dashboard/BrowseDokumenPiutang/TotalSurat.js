import { React } from "../../libraries/dependencies";
import { useSelector } from "react-redux";

import { Bar } from "react-chartjs-2";

export default function TotalSurat() {
  let labels = useSelector((state) => state.totalSurat.labels);
  let total = useSelector((state) => state.totalSurat.total);
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Total Surat",
        // fill: true,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        lineTension: 1.9,
        // backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "blue",
        borderCapStyle: "butt",
        // borderDash: [],
        // borderDashOffset: 0.0,
        // borderJoinStyle: "miter",
        // pointBorderColor: "rgba(75,192,192,1)",
        borderWidth: 0,
        pointBackgroundColor: "#fff",
        pointBorderWidth: 0,
        scales: {
          display: false,
        },
        // pointHoverRadius: 5,
        // pointHoverBackgroundColor: "rgba(75,192,192,1)",
        // pointHoverBorderColor: "rgba(220,220,220,1)",
        // pointHoverBorderWidth: 2,
        // pointRadius: 1,
        // pointHitRadius: 10,
        data: total,
      },
    ],
    options: {
      title: {
        display: true,
        text: "Custom Chart Title",
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
            gridLines: {
              offsetGridLines: true,
            },
          },
        ],
        xAxes: [
          {
            gridLines: {
              offsetGridLines: true,
            },
          },
        ],
      },
    },
  };

  return (
    <>
      <Bar data={data} width={100} height={30} />
    </>
  );
}
