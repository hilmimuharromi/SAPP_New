import { React, Table } from "../../libraries/dependencies";

export default function Pungutan(props) {
  const { data, isLoading } = props;

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
