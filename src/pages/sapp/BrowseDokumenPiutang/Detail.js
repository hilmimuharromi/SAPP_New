import {
  React,
  useState,
  Card,
  List,
  Button,
  Modal,
  Row,
} from "../../../libraries/dependencies";
import Iframe from "react-iframe";
export default function Detail({ dataKlik }) {
  const [showModal, setModal] = useState(false);
  const [contentModal, setContent] = useState("");
  console.log(dataKlik);
  let data = [];
  let dataKeterangan = [];
  if (dataKlik) {
    data = [
      {
        judul: "Kantor Penerbit",
        nilai: dataKlik.kantorPenerbit,
      },
      {
        judul: "Kantor Monitor",
        nilai: dataKlik.kantorMonitor,
      },
      {
        judul: "Dokumen",
        nilai: dataKlik.jenisDokumen,
      },
      {
        judul: "Tanggal Jatuh Tempo",
        nilai: dataKlik.tanggalJatuhTempo,
      },
      {
        judul: "Tanggal Lunas",
        nilai: null,
      },
      {
        judul: "Dokumen Asal",
        nilai: dataKlik.jenisDokumenAsal,
      },
      {
        judul: "Perusahaan",
        nilai: `${dataKlik.npwpPerusahaan}-${dataKlik.namaPerusahaan}`,
      },
      {
        judul: "Alamat Perusahaan",
        nilai: dataKlik.alamatPerusahaan,
      },
      {
        judul: "PPJK",
        nilai: dataKlik.ppjk,
      },
      {
        judul: "Petugas",
        nilai: dataKlik.nipPetugas1,
      },
    ];

    dataKeterangan = dataKlik.keterangan;
  }

  function listCetak(data) {
    if (data.judul === "Dokumen Asal" && data.cetak === "Y") {
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

  function listKeterangan(data) {
    if (dataKlik.keterangan) {
      return (
        <>
          <Row style={{ paddingLeft: "15px" }}>
            <h4>Keterangan : </h4>
          </Row>
          {/* <Row> */}
          <List
            size="small"
            // bordered
            style={{ paddingLeft: "100px" }}
            itemLayout="horizontal"
            dataSource={dataKeterangan}
            renderItem={(item, index) => (
              <List.Item
                key={index}
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
                  {item.jenisKeterangan} :
                </p>
                <p>{item.uraian}</p>
              </List.Item>
            )}
          />
          {/* </Row> */}
        </>
      );
    }
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

      {listKeterangan()}
    </Card>
  );
}
