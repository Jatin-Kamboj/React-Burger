import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../../../store/actions";
import { Redirect } from "react-router-dom";
import { applicationUrls } from "../../../../common/index";

const LogOutComponent = (props) => {
  useEffect(() => {
    props.authLogoutUser();
  });
  return <Redirect to={applicationUrls.root} />;
};
const mapStateToProps = (state) => {
  return {
    isUserAuthorised: state.auth.token != null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authLogoutUser: () => dispatch(actionCreators.authLogout()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LogOutComponent);
