import {
  React,
  Table,
  Card,
  Button,
  useState,
  Modal,
} from "../../libraries/dependencies";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../../../../stores/actions";
import Iframe from "react-iframe";
import Menu from "./SearchHeader";
import "@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css";

export default function Header(props) {
  const dispatch = useDispatch();
  const [showModal, setModal] = useState(false);
  const [contentModal, setContent] = useState("");
  let dataHeader = useSelector((state) => state.headers.data);
  console.log(dataHeader, "data header");
  let isLoading = useSelector((state) => state.headers.loadingHeader);
  const error = useSelector((state) => state.headers.errorHeader);
  console.log(error, "error ");
  function handleLihat(record) {
    setContent(record);
    setModal(true);
  }
  const columns = [
    {
      title: "Jenis Dokumen",
      dataIndex: "jenisDokumen",
      sorter: (a, b) => a.jenisDokumen.length - b.jenisDokumen.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Nomor Dokumen",
      dataIndex: "nomorDokumen",
      sorter: (a, b) => a.nomorDokumen - b.nomorDokumen,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Tanggal Dokumen",
      dataIndex: "tanggalDokumen",
      sorter: (a, b) => a.tanggalDokumen.length - b.tanggalDokumen.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Status",
      dataIndex: "status",
      sorter: (a, b) => a.status.length - b.status.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "NPWP Perusahaan",
      dataIndex: "npwpPerusahaan",
      sorter: (a, b) => a.npwpPerusahaan.length - b.npwpPerusahaan.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Nama Perusahaan",
      dataIndex: "namaPerusahaan",
      sorter: (a, b) => a.namaPerusahaan.length - b.namaPerusahaan.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Tanggal Jatuh Tempo",
      dataIndex: "tanggalJatuhTempo",
      sorter: (a, b) => a.tanggalJatuhTempo.length - b.tanggalJatuhTempo.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Jenis Dok Asal",
      dataIndex: "jenisDokumenAsal",
      sorter: (a, b) => a.jenisDokAsal.length - b.jenisDokAsal.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Nomor Dok Asal",
      dataIndex: "nomorDokumenAsal",
      sorter: (a, b) => a.nomorDokAsal.length - b.nomorDokAsal.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Tanggal Dok Asal",
      dataIndex: "tanggalDokumenAsal",
      sorter: (a, b) => a.tanggalDokAsal.length - b.tanggalDokAsal.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Kantor Penerbit",
      dataIndex: "kantorPenerbit",
      sorter: (a, b) => a.kantorPenerbit.length - b.kantorPenerbit.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Kantor Monitor",
      dataIndex: "kantorMonitor",
      sorter: (a, b) => a.kantorMonitor.length - b.kantorMonitor.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Aksi",
      dataIndex: "aksi",
      key: "operation",
      width: 100,
      fixed: "right",
      render: (text, record) => (
        <Button onClick={() => handleLihat(record)}>Cetak</Button>
      ),
    },
  ];

  return (
    <Card className="card-layout">
      <Menu />
      {/* <h3>BROWSE DOKUMEN PIUTANG</h3> */}
      <Table
        loading={isLoading}
        columns={columns}
        dataSource={dataHeader}
        size="small"
        pagination={{ pageSize: 5, showQuickJumper: true }}
        scroll={{ x: 1500 }}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              dispatch(allActions.getPungutan(record.idHeader));
              dispatch(allActions.getHistory(record.idHeader));
              props.klikRow(record);
            },
          };
        }}
      />
      <div></div>
      <Modal
        title={contentModal.no_dokumen}
        visible={showModal}
        onOk={() => setModal(false)}
        onCancel={() => setModal(false)}
      >
        <Iframe
          width="100%"
          height="600"
          src="https://www.docdroid.net/wpFJxVV/sptnp-pdf"
          frameborder="0"
          allowtransparency
          allowfullscreen
        />
      </Modal>
    </Card>
  );
}
