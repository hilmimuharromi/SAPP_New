const initialState = {
  data: false,
  loadingRekamManual: false,
  errorRekamManual: null,
};

export default function reducer(state = initialState, action) {
  if (action.type === "SET_RESULT") {
    return {
      data: action.payload,
    };
  } else if (action.type === "SET_LOADING_REKAM_MANUAL") {
    return {
      ...state,
      loadingRekamManual: action.payload,
    };
  } else if (action.type === "SET_ERROR_REKAM_MANUAL") {
    return {
      ...state,
      errorRekamManual: action.payload,
    };
  } else {
    return state;
  }
}
