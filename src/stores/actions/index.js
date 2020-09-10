import getPungutan from "./getPungutan";
import getHeaders from "./getHeaders";
import getHistory from "./getHistory";
import addRekamManual, { SET_RESULT } from "./addRekamManual";
import getJenisDokumen from "./getListDokumen";
import getTotalSurat from "./getTotalSurat";
import getPerusahaan from "./getPerusahaan";
import getTotalDokLunas from "./getTotalDokLunas";
import getTotalDokTagihan from "./getTotalDokTagihan";
import getHeaderBilling from "./getHeaderBilling";

// import getListKantor from "./getListKantor";
const actions = {
  getPungutan,
  getHeaders,
  getHistory,
  addRekamManual,
  getJenisDokumen,
  getTotalSurat,
  getPerusahaan,
  getTotalDokLunas,
  getTotalDokTagihan,
  getHeaderBilling,
  setResultRekam: SET_RESULT,
  // getListKantor,
};

export default actions;
