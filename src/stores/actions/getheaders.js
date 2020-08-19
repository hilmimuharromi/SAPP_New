import axios from "axios";
export default function FETCH_HEADERS(query) {
  return (dispatch) => {
    dispatch(SET_LOADING_HEADER(true));

    axios({
      method: "get",
      url: `http://10.162.71.119:9090/perbendaharaan/perben/piutang/get-data-browse?browse=${query}`,
    })
      .then((res) => {
        dispatch(SET_HEADERS(res.data.data));
      })
      .catch((error) => {
        dispatch(SET_ERROR_HEADER(error));
        console.log(error, "masukerror");
      })
      .finally((_) => {
        dispatch(SET_LOADING_HEADER(false));
      });
  };
}

export function SET_HEADERS(data) {
  return {
    type: "SET_HEADERS",
    payload: data,
  };
}

export function SET_LOADING_HEADER(data) {
  return {
    type: "SET_LOADING_HEADER",
    payload: data,
  };
}

export function SET_ERROR_HEADER(data) {
  return {
    type: "SET_ERROR_HEADER",
    payload: data,
  };
}
