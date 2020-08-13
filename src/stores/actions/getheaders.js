import axios from "axios";
export default function FETCH_HEADERS(url) {
  return (dispatch) => {
    dispatch(SET_LOADING(true));
    axios
      .get(url)
      .then(({ data }) => {
        dispatch(SET_HEADERS(data));
        console.log(data, "events");
      })
      .catch((error) => {
        dispatch(SET_ERROR(error));
      })
      .finally((_) => {
        dispatch(SET_LOADING(false));
      });
  };
}

export function SET_HEADERS(data) {
  return {
    type: "SET_HEADERS",
    payload: data,
  };
}

export function SET_LOADING(data) {
  return {
    type: "SET_LOADING",
    payload: data,
  };
}

export function SET_ERROR(data) {
  return {
    type: "SET_ERROR",
    payload: data,
  };
}
