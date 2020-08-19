import {
  React,
  moment,
  extendMoment,
  Popover,
  ContainerOutlined,
} from "../../libraries/dependencies";

const Moment = extendMoment(moment);
export default function NewTimeline({ data }) {
  // const { bgcolor } = props;
  let bgcolor = "#00ccff";
  // let completed = "hari";
  let datePerekaman = data.tanggalDokumen;
  let dateJatuhTempo = data.tanggalJatuhTempo;
  const today = Moment().format('"YYYY-MM-DD HH:MM:SS"');
  const hariIni = Moment().format("DD-MM-YYYY");
  const start = Moment(datePerekaman, "YYYY-MM-DD");
  const end = Moment(dateJatuhTempo, "YYYY-MM-DD");
  const now = Moment(today, '"YYYY-MM-DD HH:MM:SS"');
  const jarak = moment.range(start, end);
  const rangeToday = moment.range(start, now);

  let durasiTagihan = jarak.diff("days");
  let durasiTeguran = 7;
  let durasiPaksa = 21;
  let durasiSita = 12;
  let total = durasiTagihan + durasiTeguran + durasiPaksa + durasiSita;
  let statusKini = rangeToday.diff("days");
  let menujuHari = 0;
  let statusSurat = "";
  let tanggalPerekaman = Moment(datePerekaman).format("DD-MM-YYYY");
  let tanggalTeguran = Moment(datePerekaman)
    .add(durasiTeguran, "days")
    .format("DD-MM-YYYY");
  let tanggalPaksa = Moment(datePerekaman)
    .add(durasiPaksa + durasiTeguran, "days")
    .format("DD-MM-YYYY");
  let tanggalSita = Moment(datePerekaman)
    .add(durasiSita + durasiPaksa + durasiTeguran, "days")
    .format("DD-MM-YYYY");

  const containerStyles1 = {
    height: 15,
    width: `${(durasiTagihan * 100) / total}%`,
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    marginRight: "10px",
  };
  const containerStyles2 = {
    height: 15,
    width: `${(durasiTeguran * 100) / total}%`,
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    margin: "10px",
  };
  const containerStyles3 = {
    height: 15,
    width: `${(durasiPaksa * 100) / total}%`,
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    margin: "10px",
  };
  const containerStyles4 = {
    height: 15,
    width: `${(durasiSita * 100) / total}%`,
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    margin: "10px",
  };

  const fillerStyles1 = {
    height: "100%",
    width: `0`,
    backgroundColor: bgcolor,
    borderRadius: "inherit",
    textAlign: "right",
  };
  const fillerStyles2 = {
    height: "100%",
    width: `0`,
    backgroundColor: bgcolor,
    borderRadius: "inherit",
    textAlign: "right",
  };
  const fillerStyles3 = {
    height: "100%",
    width: `0`,
    backgroundColor: bgcolor,
    borderRadius: "inherit",
    textAlign: "right",
  };
  const fillerStyles4 = {
    height: "100%",
    width: `0`,
    backgroundColor: bgcolor,
    borderRadius: "inherit",
    textAlign: "right",
  };
  const labelStyles = {
    color: "white",
    fontWeight: "bold",
  };

  const layoutStyles = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex",
    alignItems: "center",
    width: "100%",
  };

  if (statusKini <= durasiTagihan) {
    fillerStyles1.width = `${(statusKini * 100) / durasiTagihan}%`;
    menujuHari = durasiTagihan - statusKini;
    statusSurat = "Surat Tagihan";
  } else if (
    statusKini > durasiTagihan &&
    statusKini < durasiTagihan + durasiTeguran
  ) {
    fillerStyles1.width = `100%`;
    statusKini = statusKini - durasiTagihan;
    menujuHari = durasiTagihan - statusKini;
    statusSurat = "Surat Teguran";
    fillerStyles2.width = `${(statusKini * 100) / durasiTeguran}%`;
  } else if (
    statusKini > durasiTagihan + durasiTeguran &&
    statusKini < durasiTagihan + durasiTeguran + durasiPaksa
  ) {
    fillerStyles1.width = `100%`;
    fillerStyles2.width = `100%`;
    statusKini = statusKini - durasiTagihan - durasiTeguran;
    menujuHari = durasiPaksa - statusKini;
    statusSurat = "Surat Paksa";
    fillerStyles3.width = `${(statusKini * 100) / durasiPaksa}%`;
  } else if (
    statusKini > durasiTagihan + durasiTeguran + durasiPaksa &&
    statusKini < total
  ) {
    fillerStyles1.width = `100%`;
    fillerStyles2.width = `100%`;
    fillerStyles3.width = `100%`;
    statusKini = statusKini - durasiTagihan - durasiTeguran - durasiPaksa;
    menujuHari = durasiSita - statusKini;
    statusSurat = "Surat Sita";
    fillerStyles4.width = `${(statusKini * 100) / durasiSita}%`;
  } else {
    fillerStyles1.width = `100%`;
    fillerStyles2.width = `100%`;
    fillerStyles3.width = `100%`;
    fillerStyles4.width = `100%`;
  }

  return (
    <div style={layoutStyles}>
      <span>
        <Popover
          content={`Tanggal Perekaman: ${tanggalPerekaman}`}
          title="Perekaman"
        >
          <ContainerOutlined
            style={{
              fontSize: "24px",
            }}
          />
        </Popover>
      </span>

      <Popover
        content={`${hariIni} : ${menujuHari} hari Menuju jatuh tempo ${statusSurat}`}
        title="Status Saat Ini"
      >
        <div style={containerStyles1}>
          <div style={fillerStyles1}>
            <span style={labelStyles}></span>
          </div>
        </div>
      </Popover>
      <span>
        <Popover
          content={`Tanggal Teguran: ${tanggalTeguran}`}
          title="Surat Teguran"
        >
          <ContainerOutlined style={{ fontSize: "24px" }} />
        </Popover>
      </span>
      <Popover
        content={`${hariIni} : ${menujuHari} hari Menuju jatuh tempo ${statusSurat}`}
        title="Status Saat Ini"
      >
        <div style={containerStyles2}>
          <div style={fillerStyles2}>
            <span style={labelStyles}></span>
          </div>
        </div>
      </Popover>
      <span>
        <Popover content={`Tanggal Paksa: ${tanggalPaksa}`} title="Surat Paksa">
          <ContainerOutlined style={{ fontSize: "24px", margin: "5px" }} />
        </Popover>
      </span>
      <Popover
        content={`${hariIni} : ${menujuHari} hari Menuju jatuh tempo ${statusSurat}`}
        title="Status Saat Ini"
      >
        <div style={containerStyles3}>
          <div style={fillerStyles3}>
            <span style={labelStyles}></span>
          </div>
        </div>
      </Popover>
      <span>
        <Popover content={`Tanggal Sita: ${tanggalSita}`} title="Surat Sita">
          <ContainerOutlined style={{ fontSize: "24px", margin: "5px" }} />
        </Popover>
      </span>
      <Popover
        content={`${hariIni} : ${menujuHari} hari Menuju jatuh tempo ${statusSurat}`}
        title="Status Saat Ini"
      >
        <div style={containerStyles4}>
          <div style={fillerStyles4}>
            <span style={labelStyles}></span>
          </div>
        </div>
      </Popover>
    </div>
  );
}
