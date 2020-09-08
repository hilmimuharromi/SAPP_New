import { axios } from "../../libraries/dependencies";

export default function fetchTotalDokumenBilling(
  kodeKantor,
  start,
  end,
  status
) {
  console.log(kodeKantor, start, end, status, "get total dok billing");
  return (dispatch) => {
    // dispatch(SET_LOADING(true));
    axios
      .get(
        `http://10.162.71.119:9090/perbendaharaan/perben/billing/get-total-dokumen?kodeKantor=${kodeKantor}&start=${start}&end=${end}&status=${status}`
      )
      .then(({ data }) => {
        dispatch(SET_TOTAL_DOK_BILLING_TAGIHAN(data.data));
        console.log(data.data, "total dokumen ", "tagihan");
      })
      .catch((error) => {
        // dispatch(SET_ERROR_HISTORY(error));
      })
      .finally((_) => {
        // dispatch(SET_LOADING_HISTORY(false));
        // dispatch(SET_LOADING(false));
      });
  };
}

export function SET_TOTAL_DOK_BILLING_TAGIHAN(data) {
  return {
    type: "SET_TOTAL_DOK_BILLING_TAGIHAN",
    payload: data,
  };
}

export function SET_LOADING(data) {
  return {
    type: "SET_LOADING_PERUSAHAAN",
    payload: data,
  };
}
