const initialState = {
  data: {
    totalDokumen: 0,
    totalBayar: 0,
  },
  loadingPerusahaan: false,
  errorPerusahaan: null,
};

export default function reducer(state = initialState, action) {
  if (action.type === "SET_TOTAL_DOK_BILLING_TAGIHAN") {
    return {
      ...state,
      data: action.payload,
    };
  } else {
    return state;
  }
}
