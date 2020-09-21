import {
  React,
  Row,
  Col,
  useState,
  useEffect,
  DatePicker,
  Form,
  Input,
  moment,
} from "../../../libraries/dependencies";
import SearchKantor from "../../../components/SearchKantor";
import TableHeader from "./TableHeader";
import DetailDokumen from "./DetailDokumen";
import DetailPungutan from "./DetailPungutan";
import HistoryBilling from "./HistoryBilling";
import CardTotalBilling from "./CardTotalBilling";
import { useDispatch } from "react-redux";
import allActions from "../../../stores/actions";
const { RangePicker } = DatePicker;

export default function BrowseBilling() {
  const dispatch = useDispatch();
  const [idBilling, setIdBilling] = useState("");
  const [getDetail, setGetDetail] = useState(false);
  const [hideDetail, setHideDetail] = useState(true);
  const [namaKantor, setNamaKantor] = useState("KANWIL JAKARTA");
  const [kodeKantor, setKodeKantor] = useState("040000");
  const dateFormat = "DD-MM-YYYY";
  const [startDate, setStartDate] = useState(moment().format(dateFormat));
  const [endDate, setEndDate] = useState(moment().format(dateFormat));
  useEffect(() => {
    dispatch(
      allActions.getTotalDokTagihan(kodeKantor, startDate, endDate, "TAGIHAN")
    );
    dispatch(
      allActions.getTotalDokLunas(kodeKantor, startDate, endDate, "LUNAS")
    );
    dispatch(
      allActions.getHeaderBilling("ALL", startDate, endDate, kodeKantor)
    );
  }, [dispatch, startDate, endDate, kodeKantor]);

  const FetchData = () => {
    console.log("=======");
    console.log(startDate, endDate, "periode");
    console.log(kodeKantor, "kantor");
    console.log("=======");
  };

  return (
    <>
      {" "}
      <h2>Browse Billing</h2>
      <Row justify="space-between">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
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
        <div>
          <CardTotalBilling />
        </div>
      </Row>
      <Row>
        <Col span={24}>
          <TableHeader
            setGetDetail={setGetDetail}
            setIdBilling={setIdBilling}
            setHideDetail={setHideDetail}
          />
        </Col>
      </Row>
      <Row hidden={hideDetail} id="detailBilling" gutter={[8, 8]}>
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
