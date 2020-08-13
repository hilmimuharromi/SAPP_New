const initialState = {
  data: [],
  loadingHeader: false,
  errorHeader: null,
};
export default function reducer(state = initialState, action) {
  if (action.type === "SET_HISTORY") {
    return {
      ...state,
      data: action.payload,
    };
  } else if (action.type === "SET_LOADING_HISTORY") {
    return {
      ...state,
      loadingHeader: action.payload,
    };
  } else if (action.type === "SET_ERROR_HISTORY") {
    return {
      ...state,
      errorHeader: action.payload,
    };
  } else {
    return state;
  }
}
