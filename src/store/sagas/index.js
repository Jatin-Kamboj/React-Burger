import { takeEvery } from "redux-saga/effects";
import * as actionTypes from "../actions";
import {
  logoutSaga,
  checkAuthTimeSaga,
  authSaga,
  authGetUserDetailsSaga,
  authCheckStateSaga,
} from "../sagas/auth";

import { initIngredientsSaga } from "./burger_builder_sagas/burgerBuilder";

export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeSaga);
  yield takeEvery(actionTypes.AUTH_USER, authSaga);
  yield takeEvery(actionTypes.AUTH_GET_USER_DETAILS, authGetUserDetailsSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_INTIAL_STATE, authCheckStateSaga);
}

export function* watchBurgerBuilder() {
  yield takeEvery(actionTypes.INT_INGREDIENTS, initIngredientsSaga);
}
