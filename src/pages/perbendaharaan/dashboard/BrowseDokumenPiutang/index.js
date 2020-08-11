import {
  React,
  useEffect,
  useState,
  axios,
  Layout,
  Row,
  Col,
  Button,
  Tabs,
  Card,
  Spin,
  Alert,
} from "../../libraries/dependencies";
import Pungutan from "./Pungutan";
import Detail from "./Detail";
// import Timeline from "./Timeline";
import NewTimeline from "./NewTimeline";
import History from "./History";
import MutasiDokumen from "./MutasiDokumen";
import Header from "./Header";
import TotalSurat from "./TotalSurat";
import CardTotalSurat from "./CardTotalSurat";

const { TabPane } = Tabs;

export default function BrowseDokumenPiutang() {
  const [togleChart, setTogleChart] = useState(true);
  const [dataTable, setDataTable] = useState("");
  const [dataHeader, setDataHeader] = useState("");
  const [dataPungutan, setDataPungutan] = useState([]);
  const [dataHistory, setDataHistory] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  let lokal = "http://10.102.120.36:9090";
  let server = "http://10.162.71.119:9090";

  useEffect(() => {
    // setIsloading(true);
    axios({
      method: "get",
      url: `${server}/perbendaharaan/perben/piutang/get-data-browse`,
    })
      .then((res) => {
        console.log(res.data, "berhasil fetch");
        setDataHeader(res.data.data);
      })
      .catch((error) => {
        console.log((error, "error"));
      })
      .finally((_) => {
        console.log("finnaly");
        setIsloading(false);
      });
  }, []);
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

  function getPungutan() {
    setIsloading(true);

    axios({
      method: "get",
      url: `${server}/perbendaharaan/perben/piutang/get-data-pungutan?idHeader=${dataTable.idHeader}`,
    })
      .then((res) => {
        console.log(res.data, "berhasil fetch");
        setDataPungutan(res.data.data);
      })
      .catch((error) => {
        console.log((error, "error"));
      })
      .finally((_) => {
        console.log("finnaly");
        setIsloading(false);
      });
  }

  function getHistory() {
    axios({
      method: "get",
      url: `${server}/perbendaharaan/perben/piutang/get-data-history?idHeader=${dataTable.idHeader}`,
    })
      .then((res) => {
        console.log(res.data, "berhasil fetch");
        setDataHistory(res.data.data);
      })
      .catch((error) => {
        console.log((error, "error"));
      })
      .finally((_) => {
        console.log("finnaly");
        // setIsloading(false);
      });
  }

  // if (isLoading) {
  //   return (
  //     <Spin tip="Loading...">
  //       <Alert
  //         message="Fetching data ....."
  //         // description="Further details about the context of this alert."
  //         // type="info"
  //       />
  //     </Spin>
  //   );
  // }

  function klikRow() {
    getPungutan();
    getHistory();
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
      <Row>{JSON.stringify(dataTable)}</Row>
      <Row justify="center" style={{ marginTop: "10px" }}>
        <Col span={24}>
          <Header
            isLoading={isLoading}
            klikRow={klikRow}
            setDataTable={setDataTable}
            dataHeader={dataHeader}
          />
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
              <Pungutan
                isLoading={isLoading}
                getPungutan={getPungutan}
                data={dataPungutan}
              />
              {/* Content of Tab Pane 1 */}
            </TabPane>
            <TabPane tab="Mutasi Dokumen" key="2">
              {/* Content of Tab Pane 2 */}
              <MutasiDokumen />
            </TabPane>
            <TabPane tab="History" key="3">
              {/* Content of Tab Pane 3 */}
              <History data={dataHistory} />
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </Layout>
  );
}
