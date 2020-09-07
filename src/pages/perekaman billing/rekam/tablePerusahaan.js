import { React, Table, Button } from "../../../libraries/dependencies";

export default function TablePerusahaan(props) {
  let { data, setPerusahaan, getPerusahaan, loading } = props;
  let total = data.totalData;
  let dataTable = data.data;
  console.log(data, "data perusahaan");

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
      <Table
        columns={columns}
        dataSource={dataTable}
        pagination={{ total: total, pageSize: 50 }}
        loading={loading}
        onChange={(pagination) =>
          getPerusahaan("all", pagination.pageSize, pagination.current)
        }
        scroll={{ y: 240 }}
      />
    </>
  );
}
