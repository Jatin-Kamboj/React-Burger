import { remove, get, set } from "../../../Utils";
import { put } from "redux-saga/effects";
import * as actionTypes from "../../actions/action_types";
import * as actions from "../../actions";
import { axiosInstance } from "../../../axios/axios";

export function* initIngredientsSaga(action) {
  yield put(actions.setIngredientsStart());
  try {
    const response = yield axiosInstance.get("/Ingredients.json");
    yield put(actions.set_ingredient(response.data));
  } catch (error) {
    yield put(actions.fetchIngredientsFailed(error));
  }
}
