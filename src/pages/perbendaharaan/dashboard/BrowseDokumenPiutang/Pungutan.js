import { React, Card, Table } from "../../libraries/dependencies";

export default function Pungutan() {
  const dataAwal = [
    {
      judul: "Bea Masuk",
      nilai: 24000000,
    },
    {
      judul: "Bea Keluar",
      nilai: null,
    },
    {
      judul: "BM AD",
      nilai: null,
    },
    {
      judul: "BM ADs",
      nilai: null,
    },
    {
      judul: "BM TP",
      nilai: null,
    },
    {
      judul: "BM TPs",
      nilai: null,
    },
    {
      judul: "CTEM",
      nilai: null,
    },
    {
      judul: "CMEA",
      nilai: null,
    },
    {
      judul: "CEA",
      nilai: null,
    },
    {
      judul: "DENDA",
      nilai: 5000000,
    },
    {
      judul: "BUNGA",
      nilai: null,
    },
    {
      judul: "PPN",
      nilai: 1200000,
    },
    {
      judul: "PPnBM",
      nilai: null,
    },
    {
      judul: "PPh",
      nilai: 9800000,
    },
    {
      judul: "BUNGA PPN",
      nilai: null,
    },
  ];

  const newData = dataAwal.filter((data) => {
    return data.nilai !== null;
  });

  const column = [
    {
      title: "judul",
      dataIndex: "judul",
      key: "judul",
    },
    {
      title: "nilai",
      dataIndex: "nilai",
      key: "nilai",
    },
  ];
  return (
    <Card className="card-layout">
      <h2>Pungutan</h2>
      <Table
        size={"small"}
        pagination={false}
        dataSource={newData}
        showHeader={false}
        columns={column}
      />
    </Card>
  );
}
