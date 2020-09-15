const initialState = {
  data: {},
  pungutan: [],
  status: false,
  loading: false,
  error: null,
};
export default function reducer(state = initialState, action) {
  if (action.type === "SET_DATA_CREATE_BILLING") {
    return {
      ...state,
      data: action.payload,
    };
  } else if (action.type === "SET_PUNGUTAN_CREATE_BILLING") {
    return {
      ...state,
      pungutan: action.payload,
    };
  } else if (action.type === "STATUS_TARIK_DATA") {
    return {
      ...state,
      status: action.payload,
    };
  } else {
    return state;
  }
}
