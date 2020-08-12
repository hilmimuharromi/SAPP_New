import {
  React,
  useCallback,
  useEffect,
  useState,
  axios,
  Layout,
  Row,
  Col,
  Button,
  Tabs,
  Card,
} from "../../libraries/dependencies";
import { convertToRupiah } from "../../libraries/functions";

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
  const [isLoadingPungutan, setIsloadingPungutan] = useState(false);
  // let lokal = "http://10.102.120.36:9090";
  let server = "http://10.162.71.119:9090";

  useEffect(() => {
    const fetchAwal = (server) => {
      setIsloading(true);
      return axios({
        method: "get",
        url: `${server}/perbendaharaan/perben/piutang/get-data-browse`,
      })
        .then((res) => {
          console.log(res.data, "berhasil fetch");
          let data = res.data.data;
          setDataHeader(data);
          setDataTable(data[0]);
          getPungutan(data[0].idHeader);
        })
        .catch((error) => {
          console.log((error, "error"));
        })
        .finally((_) => {
          console.log("finnaly");
          setIsloading(false);
        });
    };
    fetchAwal();
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

  const getPungutan = useCallback((idHeader) => {
    setIsloadingPungutan(true);
    return axios({
      method: "get",
      url: `${server}/perbendaharaan/perben/piutang/get-data-pungutan?idHeader=${idHeader}`,
    })
      .then((res) => {
        console.log(res.data, "berhasil fetch");
        let data = res.data.data;

        setDataPungutan(convertPungutan(data));
      })
      .catch((error) => {
        console.log((error, "error"));
      })
      .finally((_) => {
        console.log("finnaly");
        setIsloadingPungutan(false);
      });
  }, []);

  // function getPungutan(idHeader) {
  //   setIsloadingPungutan(true);
  //   return axios({
  //     method: "get",
  //     url: `${server}/perbendaharaan/perben/piutang/get-data-pungutan?idHeader=${idHeader}`,
  //   })
  //     .then((res) => {
  //       console.log(res.data, "berhasil fetch");
  //       let data = res.data.data;

  //       setDataPungutan(convertPungutan(data));
  //     })
  //     .catch((error) => {
  //       console.log((error, "error"));
  //     })
  //     .finally((_) => {
  //       console.log("finnaly");
  //       setIsloadingPungutan(false);
  //     });
  // }

  function convertPungutan(data) {
    const filterData = data.filter((item) => {
      return item.nilai !== null;
    });
    filterData.map((data) => {
      return (data.nilai = convertToRupiah(data.nilai));
    });
    return filterData;
  }

  function getHistory(idHeader) {
    axios({
      method: "get",
      url: `${server}/perbendaharaan/perben/piutang/get-data-history?idHeader=${idHeader}`,
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
      });
  }

  function klikRow(record) {
    setDataTable(record);
    getPungutan(record.idHeader);
    getHistory(record.idHeader);
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
            setIsLoading={setIsloading}
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
                isLoading={isLoadingPungutan}
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
