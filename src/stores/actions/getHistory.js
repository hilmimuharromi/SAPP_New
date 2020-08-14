import axios from "axios";
export default function FETCH_HISTORY(idHeader) {
  return (dispatch) => {
    dispatch(SET_LOADING_HISTORY(true));
    axios
      .get(
        `http://10.162.71.119:9090/perbendaharaan/perben/piutang/get-data-history?idHeader=${idHeader}`
      )
      .then(({ data }) => {
        dispatch(SET_HISTORY(data.data));
      })
      .catch((error) => {
        dispatch(SET_ERROR_HISTORY(error));
      })
      .finally((_) => {
        dispatch(SET_LOADING_HISTORY(false));
      });
  };
}

export function SET_HISTORY(data) {
  return {
    type: "SET_HISTORY",
    payload: data,
  };
}

export function SET_LOADING_HISTORY(data) {
  return {
    type: "SET_LOADING_HISTORY",
    payload: data,
  };
}

export function SET_ERROR_HISTORY(data) {
  return {
    type: "SET_ERROR_HISTORY",
    payload: data,
  };
}
