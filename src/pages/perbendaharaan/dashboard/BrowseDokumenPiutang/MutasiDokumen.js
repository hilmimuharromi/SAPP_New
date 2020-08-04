import {
  React,
  useState,
  Card,
  Table,
  Button,
  Modal,
} from "../../libraries/dependencies";

export default function MutasiDokumen() {
  const [showModal, setModal] = useState(false);
  const [contentModal, setContent] = useState("");

  function handleLihat(key) {
    setContent(key);
    setModal(true);
    console.log(key, "key===========");
  }
  const data = [
    {
      jenisDok: "Surat Teguran",
      nomorDok: "00001/teguran/2020",
      tanggalDokumen: "20/07/2020",
      tanggalJatuhTempo: "20/08/2020",
      tanggalLunas: "-",
      aksi: "",
    },
  ];

  const column = [
    {
      title: "Jenis Dokumen",
      dataIndex: "jenisDok",
      key: "jenisDok",
    },
    {
      title: "Nomor Dokumen",
      dataIndex: "nomorDok",
      key: "nomorDok",
    },
    {
      title: "Tanggal Dokumen",
      dataIndex: "tanggalDokumen",
      key: "tanggalDokumen",
    },
    {
      title: "Tanggal Jatuh Tempo",
      dataIndex: "tanggalJatuhTempo",
      key: "tanggalJatuhTempo",
    },
    {
      title: "Tanggal Lunas",
      dataIndex: "tanggalLunas",
      key: "tanggalLunas",
    },
    {
      title: "Aksi",
      dataIndex: "aksi",
      key: "operation",
      width: 100,
      fixed: "right",
      render: (text, record) => (
        <Button onClick={() => handleLihat(record)}>Lihat</Button>
      ),
    },
  ];

  return (
    <>
      <h3 style={{ marginLeft: "10px" }}>Mutasi Dokumen</h3>
      <Table dataSource={data} columns={column} scroll={{ x: 1000 }} />
      <Modal
        title={contentModal.jenisDok}
        visible={showModal}
        onOk={() => setModal(false)}
        onCancel={() => setModal(false)}
      >
        <p>{contentModal.jenisDok}</p>
        <p>{contentModal.nomorDok}</p>
        <p>{contentModal.tanggalDokumen}</p>
        <p>{contentModal.tanggalJatuhTempo}</p>
      </Modal>
    </>
  );
}
