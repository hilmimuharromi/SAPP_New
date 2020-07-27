import {
  React,
  useState,
  Layout,
  Row,
  Col,
  Button,
} from "../../libraries/dependencies";
import Pungutan from "./Pungutan";
import Detail from "./Detail";
import Timeline from "./Timeline";
import History from "./History";
import MutasiDokumen from "./MutasiDokumen";
import Header from "./Header";
import TotalSurat from "./TotalSurat";
import CardTotalSurat from "./CardTotalSurat";

export default function BrowseDokumenPiutang() {
  const [togleChart, setTogleChart] = useState(false);

  function ChartMode() {
    if (togleChart) {
      return <TotalSurat />;
    } else {
      return <CardTotalSurat />;
    }
  }

  return (
    <Layout style={{ backgroundColor: "#fff" }}>
      {/* <Menu /> */}
      <Row justify="center">
        <ChartMode />
      </Row>
      <Row justify="center">
        <Button onClick={() => setTogleChart(!togleChart)}>Change Mode</Button>
      </Row>
      <Row justify="center" style={{ marginTop: "10px" }}>
        <Col span={24}>
          <Header />
        </Col>
      </Row>
      <Row justify="center">
        <Col span={24} style={{ marginTop: "10px" }}>
          <Timeline />
        </Col>
      </Row>
      <Row justify="space-between" style={{ marginTop: "10px" }}>
        <Col span={11} style={{ marginRight: "5px" }}>
          <Detail />
        </Col>
        <Col span={11}>
          <Pungutan />
        </Col>
      </Row>
      <Row justify="space-between" style={{ marginTop: "10px" }}>
        <Col span={11}>
          <MutasiDokumen />
        </Col>
        <Col span={11}>
          <History />
        </Col>
      </Row>
    </Layout>
  );
}
