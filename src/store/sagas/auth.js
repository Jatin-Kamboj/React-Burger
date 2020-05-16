import { set, get, remove } from "../../Utils";
import { put } from "redux-saga/effects";
import * as actionTypes from "../actions/action_types";

export function* logoutSaga(action) {
  yield remove("token");
  yield remove("expirationTime");
  yield remove("userId");
  yield put({
    type: actionTypes.AUTH_LOGOUT,
  });
}
