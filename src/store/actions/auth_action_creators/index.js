import * as actionTypes from "../action_types";
import axios from "axios";
import { applicationUrls } from "../../../common";
import { set, get, remove } from "../../../Utils";
const authStart = () => {
  return { type: actionTypes.AUTH_START, loading: true };
};
// These action creators dispatch Action in the Redux Store
const authSuccess = (authData) => {
  return { type: actionTypes.AUTH_SUCCESS, loading: false, authData: authData };
};

const authFail = (error) => {
  return { type: actionTypes.AUTH_FAIL, loading: false, error: error };
};
// This action creator will auth the user

export const authLogout = () => {
  remove("token");
  remove("expirationTime");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

const checkAuthTimeOut = (authTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(authLogout());
    }, authTime * 1000);
  };
};

export const auth = (authData, isSignIn) => {
  return (dispatch) => {
    dispatch(authStart());
    authData["returnSecureToken"] = true;

    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDjI038bazcPIuRGLwdDRd_fWUumhZVMwc";
    if (isSignIn) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDjI038bazcPIuRGLwdDRd_fWUumhZVMwc";
    }
    axios
      .post(url, authData)
      .then((response) => {
        dispatch(authSuccess(response.data));
        dispatch(checkAuthTimeOut(response.data.expiresIn));

        let expirationTime = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        console.log("expirationTime", expirationTime);
        set("token", response.data.idToken);
        set("expirationTime", expirationTime);
        // dispatch(setAuthRedirectPath(applicationUrls.checkout));
      })
      .catch((error) => {
        dispatch(authFail(error.response.data.error.message));
      });
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = get("token");
    const expirationTime = new Date(get("expirationTime"));
    if (!token) {
      dispatch(authLogout());
    } else if (expirationTime > new Date()) {
      dispatch(authSuccess());
      console.log("date :", expirationTime.getTime() - new Date().getTime());
      // dispatch(checkAuthTimeOut(checkAuthTimeOut))
    }
  };
};
