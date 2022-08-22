import { all, fork } from "redux-saga/effects";
import { watchCompany } from "./companySaga";

export function* rootSaga() {
  yield all([fork(watchCompany)]);
}
