import * as actionTypes from "../../actions";
import { updateObject } from "../../../Utils/redux_utils";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: null,
  refreshToken: null,
};

const authUpdate = (state, action) => {
  return updateObject(state, {
    token: action.authData.idToken,
    userId: action.authData.email,
    refreshToken: action.authData.refreshToken,
    loading: action.loading,
  });
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.AUTH_SUCCESS:
      return authUpdate(state, action);
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        error: action.error,
        loading: action.loading,
      };
    default:
      return state;
      break;
  }
};

export default authReducer;
