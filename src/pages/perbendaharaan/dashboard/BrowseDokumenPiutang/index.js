import {
  React,
  useEffect,
  useState,
  Layout,
  Row,
  Col,
  Button,
  Tabs,
  Card,
} from "../../libraries/dependencies";
import { useDispatch } from "react-redux";
import allActions from "../../../../stores/actions";
import Pungutan from "./Pungutan";
import Detail from "./Detail";
import NewTimeline from "./NewTimeline";
import History from "./History";
import MutasiDokumen from "./MutasiDokumen";
import HeaderTable from "./Header";
import TotalSurat from "./TotalSurat";
import CardTotalSurat from "./CardTotalSurat";

const { TabPane } = Tabs;

export default function BrowseDokumenPiutang() {
  const [togleChart, setTogleChart] = useState(true);
  const [dataTable, setDataTable] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allActions.getHeaders("ALL"));
    dispatch(allActions.getTotalSurat());
  }, [dispatch]);

  function callback(key) {
    console.log(key);
  }
  function ChartMode() {
    if (togleChart) {
      return <TotalSurat />;
    } else {
      return <CardTotalSurat />;
    }
  }

  return (
    <Layout style={{ backgroundColor: "#fff" }}>
      <Row justify="center">
        <ChartMode />
      </Row>
      <Row justify="center">
        <Button onClick={() => setTogleChart(!togleChart)}>Change Mode</Button>
      </Row>
      {/* <Row>{JSON.stringify(dataTable)}</Row> */}
      <Row justify="center" style={{ marginTop: "10px" }}>
        <Col span={24}>
          <HeaderTable setDataTable={setDataTable} />
        </Col>
      </Row>
      <Row justify="center">
        <Col span={24} style={{ marginTop: "10px" }}>
          {/* <Timeline /> */}
          <Card className="card-layout">
            <h2>Timeline</h2>
            <NewTimeline data={dataTable} />
          </Card>
        </Col>
      </Row>
      <Row
        justify="start"
        style={{ marginTop: "10px" }}
        className="card-layout"
      >
        <Col span={13}>
          <Detail />
        </Col>
        <Col span={10} style={{ marginLeft: "10px", width: "700" }}>
          <Tabs defaultActiveKey="1" onChange={callback} type="line">
            <TabPane tab="Pungutan" key="1">
              <Pungutan />
              {/* Content of Tab Pane 1 */}
            </TabPane>
            <TabPane tab="Mutasi Dokumen" key="2">
              {/* Content of Tab Pane 2 */}
              <MutasiDokumen />
            </TabPane>
            <TabPane tab="History" key="3">
              {/* Content of Tab Pane 3 */}
              <History />
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </Layout>
  );
}
