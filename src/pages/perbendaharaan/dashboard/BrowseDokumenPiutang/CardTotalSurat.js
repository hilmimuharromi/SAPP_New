import {
  React,
  Card,
  Col,
  Statistic,
  Progress,
} from "../../libraries/dependencies";

export default function CardTotalSurat() {
  let totalSurat = 0;
  let data = [
    { title: "SPTNP", value: 70, valueStyle: "#3f8600" },
    { title: "SPKTNP", value: 7, valueStyle: "#00bcd4" },
    { title: "SPP", value: 5, valueStyle: "#f4e04d" },
    { title: "SPPBK", value: 12, valueStyle: "#184d47" },
    { title: "SPKPBK", value: 2, valueStyle: "#96bb7c" },
    { title: "SP3DRI", value: 1, valueStyle: "#fb7813" },
    { title: "SPSA", value: 13, valueStyle: "#3f8600" },
    { title: "SPPBMCP", value: 8, valueStyle: "#3f8600" },
    { title: "STCK1", value: 9, valueStyle: "#3f8600" },
    { title: "STCK2", value: 7, valueStyle: "#3f8600" },
    { title: "STCK3", value: 14, valueStyle: "#3f8600" },
    { title: "SPPSA", value: 13, valueStyle: "#3f8600" },
    { title: "Penagihan Seketika", value: 72, valueStyle: "#3f8600" },
    { title: "Surat Teguran", value: 150, valueStyle: "#3f8600" },
  ];

  for (let i = 0; i < data.length - 1; i++) {
    totalSurat += data[i].value;
  }

  return (
    <>
      {data.map((obj) => (
        <Col>
          <Card
            className="card-layout"
            style={{
              margin: "7px",
              width: "190px",
              backgroundColor: "#001529",
              border: "none",
            }}
          >
            <Statistic
              title={obj.title}
              value={obj.value}
              suffix={"/ " + totalSurat + " surat"}
              valueStyle={{ color: "#fff" }}
            />

            <Progress
              percent={(obj.value / totalSurat) * 100}
              type="line"
              format={(percent) => ``}
              strokeWidth={15}
              strokeColor={{
                "0%": "#108ee9",
                "100%": "#87d068",
              }}
            />
          </Card>
        </Col>
      ))}
    </>
  );
}
