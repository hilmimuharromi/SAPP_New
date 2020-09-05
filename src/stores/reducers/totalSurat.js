const initialState = {
  dataAll: [],
  data: [],
  labels: [],
  total: [],
  totalSurat: 0,
  loadingTotalSurat: false,
  errorTotalSurat: null,
};

export default function reducer(state = initialState, action) {
  if (action.type === "SET_DATA_ALL") {
    return {
      ...state,
      dataAll: action.payload,
    };
  } else if (action.type === "SET_DATA_TOTAL_SURAT") {
    return {
      ...state,
      data: action.payload,
    };
  } else if (action.type === "SET_LABELS") {
    return {
      ...state,
      labels: action.payload,
    };
  } else if (action.type === "SET_TOTAL_LABELS") {
    return {
      ...state,
      total: action.payload,
    };
  } else if (action.type === "SET_TOTAL_SURAT") {
    return {
      ...state,
      totalSurat: action.payload,
    };
  } else if (action.type === "SET_LOADING_TOTAL_SURAT") {
    return {
      ...state,
      loadingTotalSurat: action.payload,
    };
  } else if (action.type === "SET_ERROR_TOTAL_SURAT") {
    return {
      ...state,
      errorTotalSurat: action.payload,
    };
  } else {
    return state;
  }
}
