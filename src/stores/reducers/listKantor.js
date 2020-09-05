const initialState = {
  data: [],
  loadingRekamManual: false,
  errorRekamManual: null,
};

export default function reducer(state = initialState, action) {
  if (action.type === "SET_LIST_KANTOR") {
    return {
      ...state,
      data: action.payload,
    };
  } else {
    return state;
  }
}
