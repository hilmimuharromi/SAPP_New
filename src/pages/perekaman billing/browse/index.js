import { React, Row, Col, useState } from "../../../libraries/dependencies";
import TableHeader from "./TableHeader";
import DetailDokumen from "./DetailDokumen";
import DetailPungutan from "./DetailPungutan";
import HistoryBilling from "./HistoryBilling";

export default function BrowseBilling() {
  const [idBilling, setIdBilling] = useState("");
  const [getDetail, setGetDetail] = useState(false);
  return (
    <>
      {" "}
      <h2>Browse Billing</h2>
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
