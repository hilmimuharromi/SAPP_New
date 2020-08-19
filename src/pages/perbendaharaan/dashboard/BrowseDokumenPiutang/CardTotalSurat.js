import {
  React,
  Card,
  // Col,
  Statistic,
  Progress,
} from "../../libraries/dependencies";
import { useSelector } from "react-redux";

export default function CardTotalSurat() {
  let data = useSelector((state) => state.totalSurat.data);
  let totalSurat = useSelector((state) => state.totalSurat.totalSurat);

  return (
    <>
      {data.map((obj) => (
        // <Col>
        <Card
          key={obj.jenisDokumen}
          className="card-layout"
          style={{
            margin: "7px",
            width: "190px",
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
    </>
  );
}
