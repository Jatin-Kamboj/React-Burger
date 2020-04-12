import * as actionTypes from "../../actions";
import { updateObject } from "../../../Utils/redux_utils";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  refreshToken: null,
  authRedirectPath: "/",
};

const authUpdate = (state, action) => {
  return updateObject(state, {
    token: action.authData.idToken,
    localId: action.authData.localId,
    // userId: action.authData.email,
    // refreshToken: action.authData.refreshToken,
    loading: false,
  });
};

const authLogout = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: action.loading,
    token: null,
    userId: null,
    refreshToken: null,
  });
};

const authFail = (state, action) => {
  return updateObject(state, { token: null, userId: null, refreshToken: null });
};

const authStart = (state, action) => {
  return updateObject(state, { loading: action.loading });
};

const setAuthRedirectPath = (state, action) => {
  return updateObject(state, { authRedirectPath: action.path });
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authUpdate(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPath(state, action);

    default:
      return state;
      break;
  }
};

export default authReducer;
