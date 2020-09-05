import axios from "axios";
export default function FETCH_LIST_DOKUMEN(query) {
  console.log("masuk", query);
  return (dispatch) => {
    axios({
      method: "get",
      url: `http://10.162.71.119:9090/perbendaharaan/perben/referensi/list-jenis-dokumen?keterangan=${query}`,
    })
      .then((res) => {
        if (query === "JENIS DOKUMEN") {
          dispatch(SET_JENIS_DOKUMEN(res.data.data));
        } else {
          dispatch(SET_JENIS_DOKUMEN_ASAL(res.data.data));
        }
        // console.log(res.data.data, "masuk then");
      })
      .catch((error) => {
        // console.log(error, "masukerror");
      })
      .finally((_) => {
        // console.log("selesai jenis dokumen");
      });
  };
}

export function SET_JENIS_DOKUMEN(data) {
  return {
    type: "SET_JENIS_DOKUMEN",
    payload: data,
  };
}

export function SET_JENIS_DOKUMEN_ASAL(data) {
  return {
    type: "SET_JENIS_DOKUMEN_ASAL",
    payload: data,
  };
}
