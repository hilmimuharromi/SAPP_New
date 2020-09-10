import axios from "axios";
export default function FETCH_TOTAL_SURAT(start, end, kodeKantor) {
  return (dispatch) => {
    dispatch(SET_LOADING_TOTAL_SURAT(true));
    axios
      .get(
        `http://10.162.71.119:9090/perbendaharaan/perben/piutang/get-total-jenis-dokumen?start=${start}&end=${end}&kodeKantor=${kodeKantor}`
      )
      .then((res) => {
        const { data } = res.data;
        dispatch(SET_DATA_TOTAL_SURAT(data));
        let labelTemp = [];
        let totalTemp = [];
        let totalSurat = 0;

        let dataAll = [];
        data.map((item, index) => {
          let dataTemp = {
            label: item.jenisDokumen,
            total: item.totalDokumen,
            index: index + 1,
          };
          dataAll.push(dataTemp);
          labelTemp.push(item.jenisDokumen);
          totalSurat += Number(item.totalDokumen);
          return totalTemp.push(item.totalDokumen);
        });
        dispatch(SET_DATA_ALL(dataAll));
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

export function SET_DATA_ALL(data) {
  return {
    type: "SET_DATA_ALL",
    payload: data,
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
