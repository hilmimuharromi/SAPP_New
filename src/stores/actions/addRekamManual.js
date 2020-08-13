import axios from "axios";
export default function ADD_REKAM_MANUAL(payload) {
  console.log("masuk", payload);
  return (dispatch) => {
    dispatch(SET_LOADING_REKAM_MANUAL(true));

    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      url: `http://10.162.71.119:9090/perbendaharaan/perben/piutang/simpan-piutang`,
      data: payload,
    })
      .then((res) => {
        dispatch(SET_RESULT(true));
        console.log(res, "masuk rekam manual");
      })
      .catch((error) => {
        dispatch(SET_ERROR_REKAM_MANUAL(error));
        console.log(error, "masuk error");
      })
      .finally((_) => {
        dispatch(SET_LOADING_REKAM_MANUAL(false));
        dispatch(SET_RESULT(false));
      });
  };
}

export function SET_RESULT(data) {
  return {
    type: "SET_RESULT",
    payload: data,
  };
}

export function SET_LOADING_REKAM_MANUAL(data) {
  return {
    type: "SET_LOADING_REKAM_MANUAL",
    payload: data,
  };
}

export function SET_ERROR_REKAM_MANUAL(data) {
  return {
    type: "SET_ERROR_REKAM_MANUAL",
    payload: data,
  };
}
