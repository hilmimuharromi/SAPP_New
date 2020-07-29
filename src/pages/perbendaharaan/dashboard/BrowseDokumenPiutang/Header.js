import {
  React,
  Table,
  Card,
  Button,
  useState,
  Modal,
  // Row,
} from "../../libraries/dependencies";
import Menu from "../../menu/index";

export default function Header() {
  const [showModal, setModal] = useState(false);
  const [contentModal, setContent] = useState("");
  function handleLihat(record) {
    setContent(record);
    setModal(true);
    console.log(record, "data");
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
      dataIndex: "jenisDokAsal",
      sorter: (a, b) => a.jenisDokAsal.length - b.jenisDokAsal.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Nomor Dok Asal",
      dataIndex: "nomorDokAsal",
      sorter: (a, b) => a.nomorDokAsal.length - b.nomorDokAsal.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Tanggal Dok Asal",
      dataIndex: "tanggalDokAsal",
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

  const data = [
    {
      key: "1",
      jenisDokumen: "SPTNP",
      nomorDokumen: "0001/WBC1/2020",
      tanggalDokumen: "16/07/2020",
      status: "Surat Teguran",
      npwpPerusahaan: "12345678912344",
      namaPerusahaan: "PT Testing Indonesia",
      tanggalJatuhTempo: "16/09/2020",
      jenisDokAsal: "PIB",
      nomorDokAsal: "025896",
      tanggalDokAsal: "14/07/2020",
      kantorPenerbit: "009000",
      kantorMonitor: "050900",
    },
    {
      key: "2",
      jenisDokumen: "SPP",
      nomorDokumen: "00012/WBC9/2020",
      tanggalDokumen: "16/07/2020",
      status: "Surat Paksa",
      npwpPerusahaan: "12345678912344",
      namaPerusahaan: "PT Testing Indonesia",
      tanggalJatuhTempo: "16/09/2020",
      jenisDokAsal: "KITE",
      nomorDokAsal: "025896",
      tanggalDokAsal: "14/07/2020",
      kantorPenerbit: "009000",
      kantorMonitor: "040300",
    },
    {
      key: "3",
      jenisDokumen: "SPTNP",
      nomorDokumen: "0001/WBC1/2020",
      tanggalDokumen: "16/07/2020",
      status: "Surat Teguran",
      npwpPerusahaan: "12345678912344",
      namaPerusahaan: "PT Testing Indonesia",
      tanggalJatuhTempo: "16/09/2020",
      jenisDokAsal: "PIB",
      nomorDokAsal: "025896",
      tanggalDokAsal: "14/07/2020",
      kantorPenerbit: "009000",
      kantorMonitor: "050900",
    },
    {
      key: "4",
      jenisDokumen: "SPP",
      nomorDokumen: "00012/WBC9/2020",
      tanggalDokumen: "16/07/2020",
      status: "Surat Paksa",
      npwpPerusahaan: "12345678912344",
      namaPerusahaan: "PT Testing Indonesia",
      tanggalJatuhTempo: "16/09/2020",
      jenisDokAsal: "KITE",
      nomorDokAsal: "025896",
      tanggalDokAsal: "14/07/2020",
      kantorPenerbit: "009000",
      kantorMonitor: "040300",
    },
    {
      key: "5",
      jenisDokumen: "SPTNP",
      nomorDokumen: "0001/WBC1/2020",
      tanggalDokumen: "16/07/2020",
      status: "Surat Teguran",
      npwpPerusahaan: "12345678912344",
      namaPerusahaan: "PT Testing Indonesia",
      tanggalJatuhTempo: "16/09/2020",
      jenisDokAsal: "PIB",
      nomorDokAsal: "025896",
      tanggalDokAsal: "14/07/2020",
      kantorPenerbit: "009000",
      kantorMonitor: "050900",
    },
    {
      key: "6",
      jenisDokumen: "SPP",
      nomorDokumen: "00012/WBC9/2020",
      tanggalDokumen: "16/07/2020",
      status: "Surat Paksa",
      npwpPerusahaan: "12345678912344",
      namaPerusahaan: "PT Testing Indonesia",
      tanggalJatuhTempo: "16/09/2020",
      jenisDokAsal: "KITE",
      nomorDokAsal: "025896",
      tanggalDokAsal: "14/07/2020",
      kantorPenerbit: "009000",
      kantorMonitor: "040300",
    },
  ];
  return (
    <Card className="card-layout">
      <Menu />
      <h3>BROWSE DOKUMEN PIUTANG</h3>
      <Table
        columns={columns}
        dataSource={data}
        size="small"
        pagination={{ pageSize: 5, showQuickJumper: true }}
        scroll={{ x: 1500 }}
      />
      <Modal
        title={contentModal.no_dokumen}
        visible={showModal}
        onOk={() => setModal(false)}
        onCancel={() => setModal(false)}
      >
        <p>{contentModal.nama_importir}</p>
      </Modal>
    </Card>
  );
}
