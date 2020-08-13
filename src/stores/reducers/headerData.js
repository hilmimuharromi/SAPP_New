const initialState = {
  headers: [],
  loadingHeader: false,
  errorHeader: null,
};
export default function reducer(state = initialState, action) {
  if (action.type === "SET_HEADERS") {
    return {
      ...state,
      headers: action.payload,
    };
  } else if (action.type === "SET_LOADING_HEADER") {
    return {
      ...state,
      loadingHeader: action.payload,
    };
  } else if (action.type === "SET_ERROR_HEADER") {
    return {
      ...state,
      errorHeader: action.payload,
    };
  } else {
    return state;
  }
}
