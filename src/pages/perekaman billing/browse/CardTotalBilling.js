import { React, Card, NumberFormat } from "../../../libraries/dependencies";
import { useSelector } from "react-redux";

export default function CardTotalSurat() {
  let dataTagihan = useSelector((state) => state.totalDokTagihan);
  let dataLunas = useSelector((state) => state.totalDokLunas);

  let dokTagihan = {
    totalDokumen: dataTagihan.data.totalDokumen,
    totalTagihan: dataTagihan.data.totalTagihan,
  };

  let dokLunas = {
    totalDokumen: dataLunas.data.totalDokumen,
    totalBayar: dataLunas.data.totalBayar,
  };
  // const cardStyle = {
  //   margin: "7px",
  //   width: 230,
  //   textAlign: "center",
  //   border: "none",
  // };

  const cardStyle = {
    margin: "7px",
    minWidth: "230px",
    height: "120px",
    textAlign: "center",
    backgroundColor: "#001529",
    border: "none",
    color: "#fff",
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        marginBottom: "7px",
      }}
    >
      <Card
        bordered={false}
        size="small"
        title="Total Dokumen Billing"
        className="card-layout"
        headStyle={{ color: "#fff" }}
        style={cardStyle}
      >
        <h4 style={{ color: "#fff" }}>{dokTagihan.totalDokumen} Dokumen</h4>

        <NumberFormat
          value={dokTagihan.totalTagihan}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"Rp "}
        />
      </Card>

      <Card
        bordered={false}
        size="small"
        title="Total Dokumen Billing di Bayar"
        className="card-layout"
        headStyle={{ color: "#fff" }}
        style={cardStyle}
      >
        <h4 style={{ color: "#fff" }}>{dokLunas.totalDokumen} Dokumen</h4>

        <NumberFormat
          value={dokLunas.totalBayar}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"Rp "}
        />
      </Card>
    </div>
  );
}
