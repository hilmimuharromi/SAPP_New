import { React, Table } from "../../libraries/dependencies";
import { useSelector } from "react-redux";

export default function History() {
  let data = useSelector((state) => state.history.data);
  let isLoading = useSelector((state) => state.history.loadingHistory);
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
      <Table dataSource={data} columns={column} loading={isLoading} />
    </>
  );
}
