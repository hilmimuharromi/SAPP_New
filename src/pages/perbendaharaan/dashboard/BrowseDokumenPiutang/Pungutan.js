import { React, Table } from "../../libraries/dependencies";
import { useSelector } from "react-redux";

export default function Pungutan() {
  let data = useSelector((state) => state.pungutan.data);
  let isLoading = useSelector((state) => state.pungutan.loadingPungutan);
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
            backgroundColor: record.lebihBayar === "Y" ? "lightGreen" : "coral",
          }}
        >
          {record.nilai}
        </p>
      ),
    },
  ];

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
