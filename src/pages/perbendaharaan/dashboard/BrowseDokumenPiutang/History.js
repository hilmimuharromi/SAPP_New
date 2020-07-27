import { React, Card, Table } from "../../libraries/dependencies";

export default function History() {
  const data = [
    {
      status: "Perekaman",
      waktuStatus: "16/07/2020 17:20",
      nipRekam: "198989504523548987 - Andhika Kusuma",
    },
    {
      status: "Surat Teguran",
      waktuStatus: "20/08/2020 17:20",
      nipRekam: "System",
    },
  ];
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
    <Card className="card-layout">
      <h2>History</h2>
      <Table dataSource={data} columns={column} />
    </Card>
  );
}
