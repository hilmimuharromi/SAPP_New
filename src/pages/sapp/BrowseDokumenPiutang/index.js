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
  Form,
  Input,
  moment,
  DatePicker,
  useHistory,
} from "../../../libraries/dependencies";
import { useDispatch } from "react-redux";
import allActions from "../../../stores/actions";
import Pungutan from "./Pungutan";
import Detail from "./Detail";
import NewTimeline from "./NewTimeline";
import History from "./History";
import MutasiDokumen from "./MutasiDokumen";
import HeaderTable from "./Header";
// import TotalSurat from "./TotalSurat";
import CardTotalSurat from "./CardTotalSurat";
import ChartTotalSurat from "./ChartTotalSurat";
import { SearchKantor } from "../../../components";

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

export default function BrowseDokumenPiutang() {
  const [namaKantor, setNamaKantor] = useState("KANWIL JAKARTA");
  const [kodeKantor, setKodeKantor] = useState("040000");
  const dateFormat = "DD-MM-YYYY";
  const [startDate, setStartDate] = useState(
    moment("01-09-2020").format(dateFormat)
  );
  const [endDate, setEndDate] = useState(moment().format(dateFormat));
  const [togleChart, setTogleChart] = useState(true);
  const [dataTable, setDataTable] = useState("");
  const [hideCreateBilling, setHideCreateBilling] = useState(true);
  const [hideDetail, setHideDetail] = useState(true);

  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(allActions.getHeaders("ALL", startDate, endDate, kodeKantor));
    dispatch(allActions.getTotalSurat(startDate, endDate, kodeKantor));
  }, [dispatch, startDate, endDate, kodeKantor]);

  function callback(key) {
    console.log(key, "masuk cb");
  }
  function ChartMode() {
    if (togleChart) {
      return <CardTotalSurat />;
    } else {
      return <ChartTotalSurat />;
    }
  }

  const dataKantorPeriode = {
    start: startDate,
    end: endDate,
    kodeKantor,
  };

  const FetchData = () => {
    console.log("=======");
    console.log(startDate, endDate, "periode");
    console.log(kodeKantor, "kantor");
    console.log("=======");
  };

  return (
    <Layout style={{ backgroundColor: "#fff" }}>
      <Row justify="space-between">
        <h1 style={{ fontWeight: "bold", fontSize: 24 }}>
          Browse Dokumen Piutang
        </h1>
        <div>
          <Form.Item label="Kantor" style={{ marginBottom: "5px" }}>
            <Input.Group compact>
              <SearchKantor
                kodeKantor={kodeKantor}
                style={{ width: 150 }}
                onSelect={(value, option) => {
                  console.log(value, option, "dari browse");
                  setNamaKantor(option.nama);
                  setKodeKantor(value);
                  FetchData();
                }}
              />
              <h3 style={{ marginLeft: "5px" }}> {namaKantor}</h3>
            </Input.Group>
          </Form.Item>
          <Form.Item label="Periode">
            <RangePicker
              onChange={(date, dateString) => {
                setStartDate(dateString[0]);
                setEndDate(dateString[1]);
                FetchData();
              }}
              defaultValue={[
                moment(startDate, dateFormat),
                moment(endDate, dateFormat),
              ]}
              format={dateFormat}
            />
          </Form.Item>
        </div>
      </Row>
      <Row justify="center">
        <Col span={24}>
          <ChartMode />
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: "10px" }}>
        <Button onClick={() => setTogleChart(!togleChart)}>Change Mode</Button>
      </Row>
      {/* <Row>{JSON.stringify(dataTable)}</Row> */}

      <Row justify="center" style={{ marginTop: "10px" }}>
        <Col span={24}>
          <HeaderTable
            setDataTable={setDataTable}
            dataKantorPeriode={dataKantorPeriode}
            setHideCreateBilling={setHideCreateBilling}
            setHideDetail={setHideDetail}
          />
        </Col>
      </Row>

      <Row id="detailPiutang" hidden={hideDetail} justify="center">
        <Col span={24} style={{ marginTop: "10px" }}>
          {/* <Timeline /> */}
          <Card className="card-layout">
            <h2>Timeline</h2>
            <NewTimeline data={dataTable} />
          </Card>
        </Col>
      </Row>
      <Row
        id="detail"
        justify="start"
        style={{ marginTop: "10px" }}
        className="card-layout"
        hidden={hideDetail}
      >
        <Col span={13}>
          <Detail dataKlik={dataTable} />
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
      <Row
        hidden={hideCreateBilling}
        justify="center"
        style={{ marginTop: "10px" }}
      >
        <Button
          onClick={() => {
            dispatch(allActions.setCreateBilling(dataTable));
            history.push("/rekam-billing");
            console.log("data table:   ", dataTable);
          }}
          className="card-layout"
        >
          Create Billing
        </Button>
      </Row>
    </Layout>
  );
}
