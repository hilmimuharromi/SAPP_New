import {
  React,
  Table,
  Row,
  Badge,
  NumberFormat,
} from "../../../libraries/dependencies";
import { useSelector } from "react-redux";

export default function Pungutan() {
  let dataState = useSelector((state) => state.pungutan);
  // let data = dataState.data;
  let isLoading = dataState.loadingPungutan;
  console.log(dataState, "======================================");
  let data = dataState.data;
  const total = dataState.dataTotal;

  function warnaNilai(data) {
    if (data.lebihBayar === "Y") {
      return "lightGreen";
    } else {
      return "coral";
    }
  }

  const columns = [
    {
      title: "Kode Akun",
      dataIndex: "kodeAkun",
      key: "kodeAkun",
    },
    {
      title: "nilai",
      dataIndex: "nilai",
      key: "nilai",
      render: (text, record) => (
        <NumberFormat
          value={record.nilai}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"Rp "}
          style={{
            backgroundColor: warnaNilai(record),
          }}
        />
      ),
    },
  ];

  return (
    <>
      {/* <h3 style={{ marginLeft: "10px" }}>Pungutan</h3> */}
      <Table
        size={"small"}
        pagination={false}
        dataSource={data}
        showHeader={false}
        columns={columns}
        loading={isLoading}
        summary={() => (
          <Table.Summary.Row>
            <Table.Summary.Cell index={0} colSpan={1}>
              Total
            </Table.Summary.Cell>
            <Table.Summary.Cell index={1} colSpan={2}>
              <NumberFormat
                value={total}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"Rp "}
              />
            </Table.Summary.Cell>
          </Table.Summary.Row>
        )}
      />
      <Row>
        <h4>Keterangan :</h4>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Badge
            style={{ marginLeft: "10px", marginRight: "10px" }}
            color="lightGreen"
            text="Lebih Bayar"
          />
          <Badge color="coral" text="Kurang Bayar" />
        </div>
      </Row>
    </>
  );
}
