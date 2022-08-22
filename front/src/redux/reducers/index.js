import { combineReducers } from "redux";
import companyReducer from "./companyReducer";

export const rootReducer = combineReducers({
  companyState: companyReducer,
});
