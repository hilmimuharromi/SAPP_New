import { React, Card, Col, Statistic } from "../../libraries/dependencies";

export default function CardTotalSurat() {
  let totalSurat = 0;
  let data = [
    { title: "SPTNP", value: 70, valueStyle: "#3f8600" },
    { title: "SPKTNP", value: 74, valueStyle: "#00bcd4" },
    { title: "SPP", value: 75, valueStyle: "#f4e04d" },
    { title: "SPPBK", value: 72, valueStyle: "#184d47" },
    { title: "SPKPBK", value: 75, valueStyle: "#96bb7c" },
    { title: "SP3DRI", value: 76, valueStyle: "#fb7813" },
    { title: "SPSA", value: 73, valueStyle: "#3f8600" },
    { title: "SPPBMCP", value: 78, valueStyle: "#3f8600" },
    { title: "STCK1", value: 79, valueStyle: "#3f8600" },
    { title: "STCK2", value: 70, valueStyle: "#3f8600" },
    { title: "STCK3", value: 74, valueStyle: "#3f8600" },
    { title: "SPPSA", value: 73, valueStyle: "#3f8600" },
    { title: "Penagihan Seketika", value: 72, valueStyle: "#3f8600" },
    { title: "Surat Teguran", value: 76, valueStyle: "#3f8600" },
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
          </Card>
        </Col>
      ))}
    </>
  );
}
