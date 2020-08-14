const initialState = {
  data: [],
  dataTotal: 0,
  loadingPungutan: false,
  errorPungutan: null,
};
export default function reducer(state = initialState, action) {
  if (action.type === "SET_PUNGUTAN") {
    return {
      ...state,
      data: action.payload,
    };
  } else if (action.type === "SET_TOTAL_NILAI") {
    return {
      ...state,
      dataTotal: action.payload,
    };
  } else if (action.type === "SET_LOADING_PUNGUTAN") {
    return {
      ...state,
      loadingPungutan: action.payload,
    };
  } else if (action.type === "SET_ERROR_PUNGUTAN") {
    return {
      ...state,
      errorPungutan: action.payload,
    };
  } else {
    return state;
  }
}
