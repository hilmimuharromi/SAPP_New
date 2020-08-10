import { React, Table } from "../../libraries/dependencies";

export default function History() {
  const data = [
    {
      status: "Surat Sita",
      waktuStatus: "23/10/2020 17:20",
      nipRekam: "System",
    },
    {
      status: "Penerbitan Bunga",
      waktuStatus: "23/09/2020 17:20",
      nipRekam: "System",
    },
    {
      status: "Surat Paksa",
      waktuStatus: "20/09/2020 17:20",
      nipRekam: "System",
    },
    {
      status: "Surat Teguran",
      waktuStatus: "20/08/2020 17:20",
      nipRekam: "System",
    },
    {
      status: "Perekaman",
      waktuStatus: "16/07/2020 17:20",
      nipRekam: "198989504523548987 - Andhika Kusuma",
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
    <>
      <h3 style={{ marginLeft: "10px" }}>History</h3>
      <Table dataSource={data} columns={column} />
    </>
  );
}
