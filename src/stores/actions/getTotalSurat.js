import axios from "axios";
export default function FETCH_TOTAL_SURAT() {
  return (dispatch) => {
    dispatch(SET_LOADING_TOTAL_SURAT(true));
    axios
      .get(
        `http://10.162.71.119:9090/perbendaharaan/perben/piutang/get-total-jenis-dokumen`
      )
      .then((res) => {
        const { data } = res.data;
        dispatch(SET_DATA_TOTAL_SURAT(data));
        let labelTemp = [];
        let totalTemp = [];
        let totalSurat = 0;
        data.map((item) => {
          labelTemp.push(item.jenisDokumen);
          totalSurat += Number(item.totalDokumen);
          return totalTemp.push(item.totalDokumen);
        });
        dispatch(SET_LABELS(labelTemp));
        dispatch(SET_TOTAL_LABELS(totalTemp));
        dispatch(SET_TOTAL_SURAT(totalSurat));
      })
      .catch((error) => {
        dispatch(SET_ERROR_TOTAL_SURAT(error));
      })
      .finally((_) => {
        dispatch(SET_LOADING_TOTAL_SURAT(false));
      });
  };
}

export function SET_DATA_TOTAL_SURAT(data) {
  return {
    type: "SET_DATA_TOTAL_SURAT",
    payload: data,
  };
}

export function SET_TOTAL_SURAT(data) {
  return {
    type: "SET_TOTAL_SURAT",
    payload: data,
  };
}

export function SET_TOTAL_LABELS(data) {
  return {
    type: "SET_TOTAL_LABELS",
    payload: data,
  };
}

export function SET_LABELS(data) {
  return {
    type: "SET_LABELS",
    payload: data,
  };
}

export function SET_LOADING_TOTAL_SURAT(data) {
  return {
    type: "SET_LOADING_TOTAL_SURAT",
    payload: data,
  };
}

export function SET_ERROR_TOTAL_SURAT(data) {
  return {
    type: "SET_ERROR_TOTAL_SURAT",
    payload: data,
  };
}
