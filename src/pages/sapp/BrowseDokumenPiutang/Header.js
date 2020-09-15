import {
  React,
  Table,
  Card,
  Button,
  useState,
  Modal,
  ScrollTo,
} from "../../../libraries/dependencies";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../../../stores/actions";
import Iframe from "react-iframe";
import SearchHeader from "./SearchHeader";
import "@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css";

export default function Header(props) {
  const dispatch = useDispatch();
  const [showModal, setModal] = useState(false);
  const [contentModal, setContent] = useState("");
  let dataHeader = useSelector((state) => state.headers.data);
  let isLoading = useSelector((state) => state.headers.loadingHeader);
  const { dataKantorPeriode, setHideDetail } = props;
  console.log(dataHeader, "data header");
  function handleLihat(record) {
    setContent(record);
    setModal(true);
  }
  const columns = [
    {
      title: "Jenis Dokumen",
      dataIndex: "jenisDokumen",
      key: "jenisDokumen",
      sorter: (a, b) => a.jenisDokumen.length - b.jenisDokumen.length,
      sortDirections: ["descend", "ascend"],
      render: (text, record) => (
        <ScrollTo selector={"#detailPiutang"}>{text}</ScrollTo>
      ),
    },
    {
      title: "Nomor Dokumen",
      dataIndex: "nomorDokumen",
      key: "nomorDokumen",
      sorter: (a, b) => a.nomorDokumen - b.nomorDokumen,
      sortDirections: ["descend", "ascend"],
      render: (text) => <ScrollTo selector={"#detailPiutang"}>{text}</ScrollTo>,
    },
    {
      title: "Tanggal Dokumen",
      dataIndex: "tanggalDokumen",
      key: "tanggalDokumen",
      sorter: (a, b) => a.tanggalDokumen.length - b.tanggalDokumen.length,
      sortDirections: ["descend", "ascend"],
      render: (text) => <ScrollTo selector={"#detailPiutang"}>{text}</ScrollTo>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status.length - b.status.length,
      sortDirections: ["descend", "ascend"],
      render: (text) => <ScrollTo selector={"#detailPiutang"}>{text}</ScrollTo>,
    },
    {
      title: "NPWP Perusahaan",
      dataIndex: "npwpPerusahaan",
      key: "npwpPerusahaan",
      sorter: (a, b) => a.npwpPerusahaan.length - b.npwpPerusahaan.length,
      sortDirections: ["descend", "ascend"],
      render: (text) => <ScrollTo selector={"#detailPiutang"}>{text}</ScrollTo>,
    },
    {
      title: "Nama Perusahaan",
      dataIndex: "namaPerusahaan",
      key: "namaPerusahaan",
      sorter: (a, b) => a.namaPerusahaan.length - b.namaPerusahaan.length,
      sortDirections: ["descend", "ascend"],
      render: (text) => <ScrollTo selector={"#detailPiutang"}>{text}</ScrollTo>,
    },
    {
      title: "Tanggal Jatuh Tempo",
      dataIndex: "tanggalJatuhTempo",
      key: "tanggalJatuhTempo",
      sorter: (a, b) => a.tanggalJatuhTempo.length - b.tanggalJatuhTempo.length,
      sortDirections: ["descend", "ascend"],
      render: (text) => <ScrollTo selector={"#detailPiutang"}>{text}</ScrollTo>,
    },
    {
      title: "Jenis Dok Asal",
      dataIndex: "jenisDokumenAsal",
      key: "jenisDokumenAsal",
      sorter: (a, b) => a.jenisDokAsal.length - b.jenisDokAsal.length,
      sortDirections: ["descend", "ascend"],
      render: (text) => <ScrollTo selector={"#detailPiutang"}>{text}</ScrollTo>,
    },
    {
      title: "Nomor Dok Asal",
      dataIndex: "nomorDokumenAsal",
      key: "nomorDokumenAsal",

      sorter: (a, b) => a.nomorDokAsal.length - b.nomorDokAsal.length,
      sortDirections: ["descend", "ascend"],
      render: (text) => <ScrollTo selector={"#detailPiutang"}>{text}</ScrollTo>,
    },
    {
      title: "Tanggal Dok Asal",
      dataIndex: "tanggalDokumenAsal",
      key: "tanggalDokumenAsal",

      sorter: (a, b) => a.tanggalDokAsal.length - b.tanggalDokAsal.length,
      sortDirections: ["descend", "ascend"],
      render: (text) => <ScrollTo selector={"#detailPiutang"}>{text}</ScrollTo>,
    },
    {
      title: "Kantor Penerbit",
      dataIndex: "kantorPenerbit",
      key: "kantorPenerbit",

      sorter: (a, b) => a.kantorPenerbit.length - b.kantorPenerbit.length,
      sortDirections: ["descend", "ascend"],
      render: (text) => <ScrollTo selector={"#detailPiutang"}>{text}</ScrollTo>,
    },
    {
      title: "Kantor Monitor",
      dataIndex: "kantorMonitor",
      key: "kantorMonitor",

      sorter: (a, b) => a.kantorMonitor.length - b.kantorMonitor.length,
      sortDirections: ["descend", "ascend"],
      render: (text) => <ScrollTo selector={"#detailPiutang"}>{text}</ScrollTo>,
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

  const pilihButton = (record) => {
    setHideDetail(false);
    dispatch(allActions.getPungutan(record.idHeader));
    dispatch(allActions.getHistory(record.idHeader));
    props.setDataTable(record);
    if (record.kodeProses === "100") {
      props.setHideCreateBilling(false);
    }
  };

  return (
    <>
      <Card className="card-layout">
        <SearchHeader data={dataKantorPeriode} />
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
                pilihButton(record);
              },
            };
          }}
        />
      </Card>

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
    </>
  );
}
