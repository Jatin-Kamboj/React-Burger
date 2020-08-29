import { remove, get, set } from "../../../Utils";
import { put } from "redux-saga/effects";
import * as actionTypes from "../../actions/action_types";
import * as actions from "../../actions";
import { axiosInstance } from "../../../axios/axios";

export function* purchaseBurgerStartSaga(action) {
  yield put(actions.purchaseBurger());
  try {
    const response = yield axiosInstance.post(
      "/orders.json?auth=" + action.token,
      action.orderData
    );
    yield put(
      actions.purchaseBurgerSuccess(response.data.name, action.orderData)
    );
  } catch (error) {
    yield put(actions.purchaseBurgerFail(error));
  }
}

export function* fetchOrders(action) {
  yield put(actions.fetchOrdersStart());
  const queryParams =
    "?auth=" +
    action.token +
    '&orderBy="userId"&equalTo="' +
    action.userId +
    '"';

  try {
    const response = yield axiosInstance.get("/orders.json" + queryParams);
    let fetchOrders = [];
    for (const key in response.data) {
      fetchOrders.push({ ...response.data[key], id: key });
    }
    yield put(actions.fetchOrdersSuccess(fetchOrders));
  } catch (error) {
    yield put(actions.fetchOrdersFail(error));
  }
}
