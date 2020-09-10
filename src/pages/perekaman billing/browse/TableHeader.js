import { React, Table, Space, Button } from "../../../libraries/dependencies";
import { useSelector } from "react-redux";
import ScrollTo from "react-scroll-into-view";

export default function TableHeader(props) {
  let dataHeader = useSelector((state) => state.headerBilling.dataHeader);

  const { setIdBilling, setGetDetail, setHideDetail } = props;

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
      title: "Tanggal Billing",
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
          <ScrollTo
            onClick={() => buttonPilih(record)}
            selector={`#detailBilling`}
          >
            <Button>Pilih</Button>
          </ScrollTo>
        </Space>
      ),
    },
  ];

  const buttonPilih = (record) => {
    setIdBilling(record.idBilling);
    setGetDetail(true);
    setHideDetail(false);
  };
  return (
    <Table
      bordered
      dataSource={dataHeader}
      columns={columns}
      pagination={{ pageSize: 5 }}
    />
  );
}
