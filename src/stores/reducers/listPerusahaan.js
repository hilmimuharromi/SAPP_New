const initialState = {
  data: {},
  loadingPerusahaan: false,
  errorPerusahaan: null,
};

export default function reducer(state = initialState, action) {
  if (action.type === "SET_LIST_PERUSAHAAN") {
    return {
      ...state,
      data: action.payload,
    };
  } else if (action.type === "SET_LOADING_PERUSAHAAN") {
    return {
      ...state,
      loadingPerusahaan: action.payload,
    };
  } else {
    return state;
  }
}
