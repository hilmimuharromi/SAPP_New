import { axios } from "../../libraries/dependencies";

export default function fetchPerusahaan(query, limit, page) {
  console.log(query, limit, page, "get perusahaan action");
  return (dispatch) => {
    dispatch(SET_LOADING(true));

    axios
      .get(
        `http://10.162.71.119:9090/perbendaharaan/perben/referensi/list-perusahaan?search=${query}&limit=${limit}&page=${page}`
      )
      .then(({ data }) => {
        dispatch(SET_LIST_PERUSAHAAN(data.data));
        console.log(data, "fetch perusahaan");
      })
      .catch((error) => {
        // dispatch(SET_ERROR_HISTORY(error));
      })
      .finally((_) => {
        // dispatch(SET_LOADING_HISTORY(false));
        dispatch(SET_LOADING(false));
      });
  };
}

export function SET_LIST_PERUSAHAAN(data) {
  return {
    type: "SET_LIST_PERUSAHAAN",
    payload: data,
  };
}

export function SET_LOADING(data) {
  return {
    type: "SET_LOADING_PERUSAHAAN",
    payload: data,
  };
}
