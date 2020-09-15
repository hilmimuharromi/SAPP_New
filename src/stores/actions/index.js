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
import getDataRekamBilling, {
  SET_DATA_CREATE_BILLING,
  SET_PUNGUTAN_CREATE_BILLING,
  STATUS_TARIK_DATA,
  SET_CREATE_BILLING,
} from "./dataCreateBilling";

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
  getDataRekamBilling,
  setCreateBilling: SET_CREATE_BILLING,
  setDataCreateBilling: SET_DATA_CREATE_BILLING,
  setPungutanCreateBilling: SET_PUNGUTAN_CREATE_BILLING,
  setStatusTarikData: STATUS_TARIK_DATA,
  setResultRekam: SET_RESULT,
  // getListKantor,
};

export default actions;
