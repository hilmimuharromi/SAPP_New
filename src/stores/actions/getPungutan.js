import axios from "axios";
export default function FETCH_PUNGUTAN(url) {
  return (dispatch) => {
    dispatch(SET_LOADING_PUNGUTAN(true));
    axios
      .get(url)
      .then(({ data }) => {
        dispatch(SET_PUNGUTAN(data));
        console.log(data, "pungutan");
      })
      .catch((error) => {
        dispatch(SET_ERROR_PUNGUTAN(error));
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

export function SET_LOADING_PUNGUTAN(data) {
  return {
    type: "SET_LOADING_PUNGUTAN",
    payload: data,
  };
}

export function SET_ERROR_PUNGUTAN(data) {
  return {
    type: "SET_ERROR",
    payload: data,
  };
}
