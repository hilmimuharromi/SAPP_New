const initialState = {
  jenisDokumen: [],
  jenisDokumenAsal: [],
};
export default function reducer(state = initialState, action) {
  if (action.type === "SET_JENIS_DOKUMEN") {
    return {
      ...state,
      jenisDokumen: action.payload,
    };
  } else if (action.type === "SET_JENIS_DOKUMEN_ASAL") {
    return {
      ...state,
      jenisDokumenAsal: action.payload,
    };
  } else {
    return state;
  }
}
