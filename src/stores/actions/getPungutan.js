import axios from "axios";
export default function FETCH_PUNGUTAN(idHeader) {
  return (dispatch) => {
    dispatch(SET_LOADING_PUNGUTAN(true));
    axios
      .get(
        `http://10.162.71.119:9090/perbendaharaan/perben/piutang/get-data-pungutan?idHeader=${idHeader}`
      )
      .then(({ data }) => {
        let dataPungutan = data.data;
        dispatch(SET_PUNGUTAN(dataPungutan.data));
        dispatch(SET_TOTAL_NILAI(dataPungutan.total_nilai));
      })
      .catch((error) => {
        dispatch(SET_ERROR_PUNGUTAN(error));
        console.log(error, "masuk error pungutan");
      })
      .finally((_) => {
        dispatch(SET_LOADING_PUNGUTAN(false));
      });
  };
}

export function SET_PUNGUTAN(data) {
  return {
    type: "SET_PUNGUTAN",
    payload: data,
  };
}

export function SET_TOTAL_NILAI(data) {
  return {
    type: "SET_TOTAL_NILAI",
    payload: data,
  };
}

export function SET_LOADING_PUNGUTAN(data) {
  return {
    type: "SET_LOADING_PUNGUTAN",
    payload: data,
  };
}

export function SET_ERROR_PUNGUTAN(data) {
  return {
    type: "SET_ERROR_PUNGUTAN",
    payload: data,
  };
}
