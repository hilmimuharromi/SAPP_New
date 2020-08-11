import { React, Table } from "../../libraries/dependencies";
import { convertToRupiah } from "../../libraries/functions";

export default function Pungutan(props) {
  const { data, isLoading } = props;

  const filterData = data.filter((item) => {
    return item.nilai !== null;
  });
  if (!isLoading) {
    filterData.map((data) => {
      return (data.nilai = convertToRupiah(data.nilai));
    });
  }

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
        columns={columns}
        loading={isLoading}
      />
    </>
  );
}
