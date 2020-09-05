import getPungutan from "./getPungutan";
import getHeaders from "./getheaders";
import getHistory from "./getHistory";
import addRekamManual, { SET_RESULT } from "./addRekamManual";
import getJenisDokumen from "./getListDokumen";
import getTotalSurat from "./getTotalSurat";
// import getListKantor from "./getListKantor";
const actions = {
  getPungutan,
  getHeaders,
  getHistory,
  addRekamManual,
  getJenisDokumen,
  getTotalSurat,
  setResultRekam: SET_RESULT,
  // getListKantor,
};

export default actions;
