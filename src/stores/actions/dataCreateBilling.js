import axios from "axios";

export default function FETCH_CREATE_BILLING(nomorDokumen, tanggalDokumen) {
  console.log("tarik data:", nomorDokumen, tanggalDokumen);
  return (dispatch) => {
    axios
      .get(
        `http://10.162.71.119:9090/perbendaharaan/perben/piutang/get-data-browse?browse=${nomorDokumen}&tanggalDokumen=${tanggalDokumen}`
      )
      .then(({ data }) => {
        console.log(data.data, "dari tarik data");
        if (data.data) {
          let dataServer = data.data[0];
          dispatch(SET_CREATE_BILLING(dataServer));
        } else {
          dispatch(STATUS_TARIK_DATA(true));
        }
      });
  };
}

export function SET_CREATE_BILLING(data) {
  return (dispatch) => {
    console.log(data, "dr action klik create billing");
    let dataPungutan = [];
    data.pungutan.data.map((item, index) => {
      return dataPungutan.push({
        key: index + 1,
        namaAkun: item.kodeAkun,
        kodeAkun: item.kode,
        npwpPembayaran: data.npwpPerusahaan,
        nilai: item.nilai,
      });
    });
    let payload = {
      total: data.pungutan.total_nilai,
      data: dataPungutan,
    };
    dispatch(SET_DATA_CREATE_BILLING(data));
    dispatch(SET_PUNGUTAN_CREATE_BILLING(payload));
    dispatch(STATUS_TARIK_DATA("ditemukan"));
  };
}

export function SET_DATA_CREATE_BILLING(data) {
  return {
    type: "SET_DATA_CREATE_BILLING",
    payload: data,
  };
}

export function STATUS_TARIK_DATA(data) {
  return {
    type: "STATUS_TARIK_DATA",
    payload: data,
  };
}

export function SET_PUNGUTAN_CREATE_BILLING(data) {
  return {
    type: "SET_PUNGUTAN_CREATE_BILLING",
    payload: data,
  };
}
