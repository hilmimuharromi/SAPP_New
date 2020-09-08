import { React, Table, Button, Input } from "../libraries/dependencies";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../stores/actions";
const { Search } = Input;
export default function TablePerusahaan(props) {
  const dispatch = useDispatch();
  const dataStore = useSelector((state) => state.refPerusahaan);
  const { setPerusahaan } = props;
  const loading = dataStore.loadingPerusahaan;
  const dataTable = dataStore.data.data;
  const total = dataStore.data.totalData;
  console.log(dataStore, "data perusahaan");

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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "10px",
          padding: 0,
        }}
      >
        <Search
          placeholder="input search Perusahaan"
          // enterButton="Search"
          size="large"
          style={{ width: 300 }}
          onSearch={(value) => dispatch(allActions.getPerusahaan(value, 50, 1))}
          enterButton
        />
      </div>
      <Table
        columns={columns}
        dataSource={dataTable}
        pagination={{ total: total, pageSize: 50 }}
        loading={loading}
        onChange={(pagination) =>
          dispatch(
            allActions.getPerusahaan(
              "all",
              pagination.pageSize,
              pagination.current
            )
          )
        }
        scroll={{ y: 240 }}
      />
    </>
  );
}
