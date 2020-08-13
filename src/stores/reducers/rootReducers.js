import { combineReducers } from "redux";
import headerReducer from "./headerData";
import addEventReducer from "./addEventReducer";

const rootReducers = combineReducers({
  headers: headerReducer,
  addEvent: addEventReducer,
});

export default rootReducers;
