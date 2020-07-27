import { React } from "../../libraries/dependencies";
import { Bar } from "react-chartjs-2";

export default function TotalSurat() {
  const data = {
    labels: [
      "SPTNP",
      "SPKTNP",
      "SPP",
      "SPPBK",
      "SPKPBK",
      "SP3DRI",
      "SPSA",
      "SPPBMCP",
      "STCK1",
      "STCK2",
      "STCK3",
      "SPPSA",
      "Penagihan Seketika",
      "Surat Teguran",
    ],
    datasets: [
      {
        // label: "Total Surat",
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
        // borderColor: "blue",
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
        data: [65, 59, 80, 81, 56, 55, 77, 80, 90, 56, 55, 77, 80, 90, 70],
      },
    ],
  };

  return (
    <>
      <Bar data={data} width={100} height={20} />
    </>
  );
}
