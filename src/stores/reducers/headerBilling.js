const initialState = {
  dataHeader: [],
  loading: false,
  error: null,
};
export default function reducer(state = initialState, action) {
  if (action.type === "SET_HEADER_BILLING") {
    return {
      ...state,
      dataHeader: action.payload,
    };
  } else if (action.type === "SET_LOADING_HEADER_BILLING") {
    return {
      ...state,
      loading: action.payload,
    };
  } else if (action.type === "SET_ERROR_HEADER_BILLING") {
    return {
      ...state,
      error: action.payload,
    };
  } else {
    return state;
  }
}
