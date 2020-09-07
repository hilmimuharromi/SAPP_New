import {
  React,
  useState,
  moment,
  axios,
  Button,
  List,
  NumberFormat,
} from "../../../libraries/dependencies";

export default function Detail(props) {
  const { idBilling, getDetail, setGetDetail } = props;
  const [data, setData] = useState([]);

  if (getDetail) {
    axios
      .get(
        `http://10.162.71.119:9090/perbendaharaan/perben/billing/get-billing-detail-dokumen?idBilling=${idBilling}`
      )
      .then(({ data }) => {
        console.log(data, "detail");
        console.log(idBilling, "id billing");
        let item = data.data[0];
        if (item) {
          let formatData = [
            {
              title: "Kantor",
              content: item.kantor,
            },
            {
              title: "Kode Billing",
              content: item.kodeBilling,
            },
            {
              title: "Tanggal Billing",
              content: item.tanggalBilling,
            },
            {
              title: "Total Tagihan",
              content: (
                <NumberFormat
                  value={item.totalTagihan}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"Rp "}
                />
              ),
            },
            {
              title: "TanggalExpired",
              content: item.tanggalExpired,
            },
            {
              title: "Jenis Dokumen",
              content: item.jenisDokumen,
            },
            {
              title: "Nomor / Tanggal Dokumen",
              content: `${item.nomorDokumen}/${moment(
                item.tanggalDokumen
              ).format("YYYY/MM/DD")}`,
            },
            {
              title: "Id Wajib Bayar",
              content: item.idWajibBayar,
            },
            {
              title: "Nama Wajib Bayar",
              content: item.namaWajibBayar,
            },
            {
              title: "NTPN / Tanggal",
              content:
                !item.tanggalNtpn || !item.Ntpn
                  ? ""
                  : `${item.ntpn} - ${moment(item.tanggalNtpn).format(
                      "YYYY/MM/DD"
                    )}`,
            },
            {
              title: "NTB / Tanggal",
              content:
                !item.tanggalNtb || !item.Ntb
                  ? ""
                  : `${item.ntb} - ${moment(item.tanggalNtb).format(
                      "YYYY/MM/DD"
                    )}`,
            },
            {
              title: "Tanggal Buku",
              content: item.tanggalBuku,
            },
            {
              title: "Bank Pembayaran",
              content: item.bankPembayaran,
            },
            {
              title: "Nomor Struk Bayar",
              content: item.noStrukBayar,
            },
          ];
          setData(formatData);
        }
        setGetDetail(false);
      });
  }
  return (
    <>
      <List
        dataSource={data}
        bordered
        renderItem={(item, index) => (
          <List.Item
            key={index}
            // className="list-detail"
            style={{
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <div
              style={{
                margin: "0 5px",
                width: 200,
              }}
            >
              {item.title} :
            </div>

            {item.title === "Kode Billing" ? (
              <div>
                {item.content} <Button>Cetak</Button>{" "}
              </div>
            ) : (
              <div>{item.content}</div>
            )}
          </List.Item>
        )}
      />
    </>
  );
}
