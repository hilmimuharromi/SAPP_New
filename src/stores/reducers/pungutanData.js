const initialState = {
  pungutan: [],
  loadingPungutan: false,
  errorPungutan: null,
};
export default function reducer(state = initialState, action) {
  if (action.type === "SET_PUNGUTAN") {
    return {
      ...state,
      pungutan: action.payload,
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
