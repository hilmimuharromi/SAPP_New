import { React, Table } from "../../libraries/dependencies";
import { useSelector } from "react-redux";

export default function Pungutan() {
  let dataState = useSelector((state) => state.pungutan);
  let data = dataState.data;
  // let dataTotal = dataState.dataTotal;
  let isLoading = dataState.loadingPungutan;

  function warnaNilai(data) {
    if (data.kodeAkun !== "Total Nilai") {
      if (data.lebihBayar === "Y") {
        return "lightGreen";
      } else {
        return "coral";
      }
    } else {
      return "";
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
        <p
          style={{
            backgroundColor: warnaNilai(record),
          }}
        >
          {record.nilai}
        </p>
      ),
    },
  ];

  console.log(dataState, "dari componen pungutan");

  return (
    <>
      <h3 style={{ marginLeft: "10px" }}>Pungutan</h3>
      <Table
        size={"small"}
        pagination={false}
        dataSource={data}
        showHeader={false}
        columns={columns}
        loading={isLoading}
      />
    </>
  );
}
