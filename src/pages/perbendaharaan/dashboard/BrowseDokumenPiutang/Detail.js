import {
  React,
  useState,
  Card,
  List,
  Button,
  Modal,
} from "../../libraries/dependencies";
import Iframe from "react-iframe";
export default function Detail() {
  const [showModal, setModal] = useState(false);
  const [contentModal, setContent] = useState("");
  const data = [
    // {
    //   judul: "Kantor Penerbit",
    //   nilai: "009000 - Direktorat Informasi Kepabeanan dan Cukai",
    // },
    // {
    //   judul: "Kantor Monitor",
    //   nilai: "050900 - KPPBC TMP A Bekasi",
    // },
    // {
    //   judul: "Dokumen",
    //   nilai: "SPTNP",
    // },
    // {
    //   judul: "Tanggal Jatuh Tempo",
    //   nilai: "16/09/2020",
    // },
    // {
    //   judul: "Tanggal Lunas",
    //   nilai: null,
    // },
    // {
    //   judul: "Dokumen Asal",
    //   nilai: "PIB - NOMOR 025896 Tanggal 14/07/2020",
    // },
    // {
    //   judul: "Perusahaan",
    //   nilai: "12345678912345 - PT Testing Indonesia",
    // },
    // {
    //   judul: "Alamat Perusahaan",
    //   nilai: "Jalan Alamat PT Tesing Indonesia",
    // },
    // {
    //   judul: "PPJK",
    //   nilai: null,
    // },
    // {
    //   judul: "Petugas",
    //   nilai: "198989504523548987 - Andhika Kusuma",
    // },
    // {
    //   judul: "Keterangan",
    //   nilai: "Penetapan Dokumen Impor Karena Kesalahan tarif",
    // },
  ];

  function listCetak(data) {
    if (data.judul === "Dokumen Asal") {
      return (
        <p>
          {data.nilai} <Button onClick={() => handleLihat(data)}>Lihat</Button>
        </p>
      );
    } else {
      return <p>{data.nilai}</p>;
    }
  }

  function handleLihat(key) {
    setContent(key);
    setModal(true);
    // console.log(key, "key===========");
  }

  return (
    <Card>
      <h2>Detail</h2>
      <Modal
        title={contentModal.judul}
        visible={showModal}
        onOk={() => setModal(false)}
        onCancel={() => setModal(false)}
      >
        {/* <p>{contentModal.nilai}</p> */}
        <Iframe
          width="100%"
          height="600"
          src="https://www.docdroid.net/i25OJEV/pib-pdf"
          frameborder="0"
          allowtransparency
          allowfullscreen
        />
      </Modal>
      <List
        size="small"
        // bordered
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            key={item.judul}
            className="list-detail"
            style={{
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <p
              style={{
                minWidth: "150px",
                maxWidth: "200px",
              }}
            >
              {item.judul}
            </p>
            {listCetak(item)}
          </List.Item>
        )}
      />
    </Card>
  );
}
