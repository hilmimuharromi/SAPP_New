import {
  React,
  Card,
  // Col,
  Statistic,
  Progress,
} from "../../../libraries/dependencies";
import { useSelector } from "react-redux";

export default function CardTotalSurat() {
  let data = useSelector((state) => state.totalSurat.data);
  let totalSurat = useSelector((state) => state.totalSurat.totalSurat);
  const containerOver = {
    overflow: "auto",
    height: "150px",
    padding: "10 0",
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    whiteSpace: "nowrap",
    scrollbarColor: "#001529 #d8dee9",
  };
  return (
    <div className="card-total-surat" style={containerOver}>
      {data.map((obj) => (
        // <Col>
        <Card
          key={obj.jenisDokumen}
          className="card-layout"
          style={{
            margin: "7px",
            minWidth: "230px",
            height: "120px",
            backgroundColor: "#001529",
            border: "none",
          }}
        >
          <Statistic
            key={obj.jenisDokumen}
            title={obj.jenisDokumen}
            value={obj.totalDokumen}
            suffix={"/ " + totalSurat + " surat"}
            valueStyle={{ color: "#fff" }}
          />

          <Progress
            key={obj.jenisDokumen}
            percent={(obj.totalDokumen / totalSurat) * 100}
            type="line"
            format={(percent) => ``}
            strokeWidth={15}
            strokeColor={{
              "0%": "#108ee9",
              "100%": "#87d068",
            }}
          />
        </Card>
        // </Col>
      ))}
    </div>
  );
}
