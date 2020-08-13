import axios from "axios";
import convertToRupiah from "../../pages/perbendaharaan/libraries/functions/covertRupiah";
export default function FETCH_PUNGUTAN(idHeader) {
  return (dispatch) => {
    dispatch(SET_LOADING_PUNGUTAN(true));
    axios
      .get(
        `http://10.162.71.119:9090/perbendaharaan/perben/piutang/get-data-pungutan?idHeader=${idHeader}`
      )
      .then(({ data }) => {
        function convertPungutan(data) {
          const filterData = data.filter((item) => {
            return item.nilai !== null;
          });
          filterData.map((data) => {
            return (data.nilai = convertToRupiah(data.nilai));
          });
          return filterData;
        }

        let dataRupiah = convertPungutan(data.data);
        dispatch(SET_PUNGUTAN(dataRupiah));
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
    type: "SET_ERROR_PUNGUTAN",
    payload: data,
  };
}
