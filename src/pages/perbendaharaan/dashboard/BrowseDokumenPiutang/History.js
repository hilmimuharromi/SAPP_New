import { React, Table } from "../../libraries/dependencies";

export default function History({ data }) {
  const column = [
    {
      title: "status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Waktu Status",
      dataIndex: "waktuStatus",
      key: "waktuStatus",
    },
    {
      title: "NIP Rekam",
      dataIndex: "nipRekam",
      key: "nipRekam",
    },
  ];
  return (
    <>
      <h3 style={{ marginLeft: "10px" }}>History</h3>
      <Table dataSource={data} columns={column} />
    </>
  );
}
