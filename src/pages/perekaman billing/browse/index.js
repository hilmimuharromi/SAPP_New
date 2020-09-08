import {
  React,
  Row,
  Col,
  useState,
  useEffect,
  moment,
} from "../../../libraries/dependencies";
import TableHeader from "./TableHeader";
import DetailDokumen from "./DetailDokumen";
import DetailPungutan from "./DetailPungutan";
import HistoryBilling from "./HistoryBilling";
import CardTotalBilling from "./CardTotalBilling";
import { useDispatch } from "react-redux";
import allActions from "../../../stores/actions";

export default function BrowseBilling() {
  const dispatch = useDispatch();
  const [idBilling, setIdBilling] = useState("");
  const [getDetail, setGetDetail] = useState(false);

  useEffect(() => {
    dispatch(
      allActions.getTotalDokTagihan(
        "050900",
        "2020-09-01",
        "2020-09-30",
        "TAGIHAN"
      )
    );
    dispatch(
      allActions.getTotalDokLunas("050900", "2020-09-01", "2020-09-30", "LUNAS")
    );
  });
  let tanggalAwal = moment().add(1, "M").endOf("month").format("YYYY/MM/DD");
  let bulanSekarang = moment().get("month");
  let bulan = bulanSekarang + 1;
  let tahun = moment().get("year");

  let tanggalLima = moment([tahun, bulan, 5]).format("YYYY/MM/DD");
  console.log(bulan, tahun, "setting tanggal", bulanSekarang);
  return (
    <>
      {" "}
      <h2>Browse Billing</h2>
      <Row>{JSON.stringify(tanggalAwal)}</Row>
      <Row>{JSON.stringify(tanggalLima)}</Row>
      <Row justify="center">
        <CardTotalBilling />
      </Row>
      <Row>
        <Col span={24}>
          <TableHeader
            setGetDetail={setGetDetail}
            setIdBilling={setIdBilling}
          />
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <h2>Detail Dokumen</h2>
          <DetailDokumen
            style={{ width: 300 }}
            getDetail={getDetail}
            setGetDetail={setGetDetail}
            idBilling={idBilling}
          />
        </Col>
        <Col span={11}>
          {" "}
          <h2>Detail Pungutan</h2>
          <DetailPungutan
            setGetDetail={setGetDetail}
            getDetail={getDetail}
            idBilling={idBilling}
          />
          <h2 style={{ margin: "10px 0" }}>History Billing</h2>
          <HistoryBilling
            setGetDetail={setGetDetail}
            getDetail={getDetail}
            idBilling={idBilling}
          />
        </Col>
      </Row>
    </>
  );
}
