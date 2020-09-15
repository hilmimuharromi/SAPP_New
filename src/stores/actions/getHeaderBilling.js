import axios from "axios";
export default function FETCH_HEADER_BILLING(query, start, end, kodeKantor) {
  console.log(start, end, "get header billing");
  return (dispatch) => {
    dispatch(SET_LOADING_HEADER_BILLING(true));

    axios({
      method: "get",
      url: `http://10.162.71.119:9090/perbendaharaan/perben/billing/get-billing-browse?kodeKantor=${kodeKantor}&start=${start}&end=${end}`,
    })
      .then(({ data }) => {
        let listDataHeader = data.data;
        listDataHeader.map((item, index) => {
          return (item.no = index + 1);
        });
        dispatch(SET_HEADER_BILLING(listDataHeader));
      })
      .catch((error) => {
        dispatch(SET_ERROR_HEADER_BILLING(error));
        console.log(error, "masukerror");
      })
      .finally((_) => {
        dispatch(SET_LOADING_HEADER_BILLING(false));
      });
  };
}

export function SET_HEADER_BILLING(data) {
  return {
    type: "SET_HEADER_BILLING",
    payload: data,
  };
}

export function SET_LOADING_HEADER_BILLING(data) {
  return {
    type: "SET_LOADING_HEADER_BILLING",
    payload: data,
  };
}

export function SET_ERROR_HEADER_BILLING(data) {
  return {
    type: "SET_ERROR_HEADER_BILLING",
    payload: data,
  };
}
