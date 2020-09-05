import { React, Table, Button } from "../../../libraries/dependencies";

export default function TablePerusahaan(props) {
  let { data, setPerusahaan, getPerusahaan } = props;

  let dataTable = data;

  // let dataTable = [
  //   {
  //     npwp: 123,
  //     namaPerusahaan: "saya",
  //   },
  //   {
  //     npwp: 123,
  //     namaPerusahaan: "saya",
  //   },
  // ];

  const columns = [
    {
      title: "NPWP",
      dataIndex: "npwp",
      key: "npwp",
    },
    {
      title: "Nama",
      dataIndex: "namaPerusahaan",
      key: "namaPerusahaan",
    },
    {
      title: "ALamat",
      dataIndex: "alamatPerusahaan",
      key: "alamatPerusahaan",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button onClick={() => setPerusahaan(record)}>Pilih</Button>
      ),
    },
  ];
  return (
    <>
      {/* {JSON.stringify(dataTable)} */}
      <Table
        columns={columns}
        dataSource={dataTable}
        pagination={{ total: 16, pageSize: 4 }}
        onChange={(pagination) =>
          getPerusahaan("all", pagination.pageSize, pagination.current)
        }
        scroll={{ y: 240 }}
      />
    </>
  );
}
