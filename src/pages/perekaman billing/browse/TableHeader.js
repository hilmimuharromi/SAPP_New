import {
  React,
  useEffect,
  useState,
  axios,
  Table,
  Space,
  Button,
} from "../../../libraries/dependencies";

export default function TableHeader(props) {
  const [dataHeader, setDataHeader] = useState([]);
  const { setIdBilling, setGetDetail } = props;

  useEffect(() => {
    axios
      .get(
        `http://10.162.71.119:9090/perbendaharaan/perben/billing/get-billing-browse?kodeKantor=040000&start=2020-09-01&end=2020-09-30`
      )
      .then(({ data }) => {
        let listDataHeader = data.data;
        listDataHeader.map((item, index) => {
          return (item.no = index + 1);
        });
        setDataHeader(listDataHeader);
      });
  });
  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Kode Billing",
      dataIndex: "kodeBilling",
      key: "kodeBilling",
    },
    {
      title: "Banggal Billing",
      dataIndex: "tanggalBilling",
      key: "tanggalBilling",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Id Wajib Bayar",
      dataIndex: "idWajibBayar",
      key: "idWajibBayar",
    },
    {
      title: "Nama Wajib Bayar",
      dataIndex: "namaWajibBayar",
      key: "namaWajibBayar",
    },
    {
      title: "Kantor",
      dataIndex: "kantor",
      key: "kantor",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => buttonPilih(record)}>Pilih</Button>
        </Space>
      ),
    },
  ];

  const buttonPilih = (record) => {
    setIdBilling(record.idBilling);
    setGetDetail(true);
  };
  return (
    <Table
      dataSource={dataHeader}
      columns={columns}
      pagination={{ pageSize: 5 }}
    />
  );
}
