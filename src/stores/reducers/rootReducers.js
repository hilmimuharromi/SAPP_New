import { combineReducers } from "redux";
import headerReducer from "./headerData";
import pungutanReducer from "./pungutanData";
import historyReducer from "./historydata";
import rekamReducer from "./rekamManual";
import jenisDokumen from "./jenisDokumen";
import totalSurat from "./totalSurat";
// import listKantor from "./listKantor";

const rootReducers = combineReducers({
  headers: headerReducer,
  pungutan: pungutanReducer,
  history: historyReducer,
  rekamManual: rekamReducer,
  jenisDokumen: jenisDokumen,
  totalSurat,
  // listKantor,
});

export default rootReducers;
