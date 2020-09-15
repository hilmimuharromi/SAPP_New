import { combineReducers } from "redux";
import headerReducer from "./headerData";
import pungutanReducer from "./pungutanData";
import historyReducer from "./historydata";
import rekamReducer from "./rekamManual";
import jenisDokumen from "./jenisDokumen";
import totalSurat from "./totalSurat";
import listPerusahaan from "./listPerusahaan";
import totalDokTagihan from "./totalDokTagihan";
import totalDokLunas from "./totalDokLunas";
import headerBilling from "./headerBilling";
// import listKantor from "./listKantor";
import dataCreateBilling from "./dataCreateBilling";

const rootReducers = combineReducers({
  headers: headerReducer,
  pungutan: pungutanReducer,
  history: historyReducer,
  rekamManual: rekamReducer,
  jenisDokumen: jenisDokumen,
  refPerusahaan: listPerusahaan,
  headerBilling,
  totalDokTagihan,
  totalDokLunas,
  totalSurat,
  dataCreateBilling,
  // listKantor,
});

export default rootReducers;
