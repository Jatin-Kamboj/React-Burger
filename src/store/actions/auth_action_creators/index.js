import * as actionTypes from "../action_types";
import axios from "axios";
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

export const auth = (authData, isSignIn) => {
  return (dispatch) => {
    dispatch(authStart());
    authData["returnSecureToken"] = true;
    console.log("Axios Auth => ", authData);
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
        console.log("auth", response);
      })
      .catch((error) => {
        dispatch(authFail(error));
      });
  };
};
