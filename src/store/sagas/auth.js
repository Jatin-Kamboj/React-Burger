import { remove, get, set } from "../../Utils";
import { put, delay } from "redux-saga/effects";
import * as actionTypes from "../actions/action_types";
import * as actions from "../actions";
import axios from "axios";

export function* logoutSaga(action) {
  // console.log("logoutSaga", action);
  yield remove("token");
  yield remove("expirationTime");
  yield remove("userId");
  yield put(actions.logoutSucceed()); // This action updates the state in the reducer and redux store
}

export function* checkAuthTimeSaga(action) {
  // console.log("checkAuthTime");
  yield delay(action.expirationTime * 1000);
  yield put(actions.authLogout()); // This action performs side effects in the Redux store and the logic is written in the Reducer for the dispatched action.
}

export function* authSaga(action) {
  // console.log("authSaga", action);
  yield put(actions.authStart());
  action.authData["returnSecureToken"] = true;

  let url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDjI038bazcPIuRGLwdDRd_fWUumhZVMwc";
  if (action.isSignIn) {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDjI038bazcPIuRGLwdDRd_fWUumhZVMwc";
  }
  try {
    const response = yield axios.post(url, action.authData);
    yield put(actions.authSuccess(response.data));
    yield put(actions.checkAuthTimeOut(response.data.expiresIn));

    let expirationTime = yield new Date(
      new Date().getTime() + response.data.expiresIn * 1000
    );
    yield set("token", response.data.idToken);
    yield set("expirationTime", expirationTime);
    yield set("userId", response.data.localId);
  } catch (error) {
    yield put(actions.authFail(error));
  }
}

export function* authGetUserDetailsSaga(action) {
  // console.log("authGetUserDetailsSaga", action);
  yield put(actions.authGetUserDetailsStart());
  const payLoad = {
    idToken: action.idToken,
  };
  try {
    const response = yield axios.post(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDjI038bazcPIuRGLwdDRd_fWUumhZVMwc",
      payLoad
    );

    yield put(actions.authGetUserDetailsSuccess());
    let userDetails = yield response.data.users[0];
    yield (userDetails["idToken"] = action.idToken);
    yield put(actions.authSuccess(userDetails));
  } catch (error) {
    yield put(actions.authGetUserDetailsFail(error.response.data.errorMessage));
  }
}

export function* authCheckStateSaga(action) {
  const token = yield get("token");
  const expirationTime = yield new Date(get("expirationTime"));
  if (!token) {
    yield put(actions.authLogout());
  } else if (expirationTime > new Date() && token) {
    yield put(actions.authGetUserDetails(token));

    yield put(
      actions.checkAuthTimeOut(
        (expirationTime.getTime() - new Date().getTime()) / 1000
      )
    );
  }
}
