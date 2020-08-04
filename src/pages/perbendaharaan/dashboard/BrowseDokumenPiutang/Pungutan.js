import { React, Card, Table } from "../../libraries/dependencies";
import { convertToRupiah } from "../../libraries/functions";

export default function Pungutan() {
  const dataAwal = [
    {
      judul: "Bea Masuk",
      nilai: 24000000,
    },
    {
      judul: "Bea Keluar",
      nilai: 1000,
    },
    {
      judul: "BM AD",
      nilai: 20000,
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
      nilai: 2222,
    },
    {
      judul: "CMEA",
      nilai: 3223232,
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
      nilai: 2323232,
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

  const filterData = dataAwal.filter((data) => {
    return data.nilai !== null;
  });

  // const newData = filterData.map((data) => {
  //   data.nilai = convertToRupiah(data.nilai);
  // });

  filterData.map((data) => {
    return (data.nilai = convertToRupiah(data.nilai));
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
    <>
      <h3 style={{ marginLeft: "10px" }}>Pungutan</h3>
      <Table
        size={"small"}
        pagination={false}
        dataSource={filterData}
        showHeader={false}
        columns={column}
      />
    </>
  );
}
