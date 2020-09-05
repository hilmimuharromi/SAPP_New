import axios from "axios";

export default function FETCH_LIST_KANTOR() {
  return (dispatch) => {
    // dispatch(SET_LOADING_HISTORY(true));
    axios
      .get(`http://10.162.71.21:8111/Referensi/v1/kantor/all`)
      .then((res) => {
        let dataKantor = res.data.data;
        let dataTemp = [];
        // dataKantor.map((item) => {
        //   let data = {
        //     options: [renderItem(item.kodeKantor, item.namaKantorPendek)],
        //   };
        //   return dataTemp.push(data);
        // });
        dispatch(SET_LIST_KANTOR(dataKantor));
      })
      .catch((error) => {
        // dispatch(SET_ERROR_HISTORY(error));
      })
      .finally((_) => {
        // dispatch(SET_LOADING_HISTORY(false));
      });
  };
}

export function SET_LIST_KANTOR(data) {
  return {
    type: "SET_LIST_KANTOR",
    payload: data,
  };
}
