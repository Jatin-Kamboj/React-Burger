import React from "react";
import classes from "./SideDrawer.module.css";
import NavigationItems from "../Navigation/NavigationItems/NavigationItems";
import Backdrop from "../UI/Backdrop/Backdrop";
import Logo from "../Logo/Logo";
import Aux from "../hoc/auxilary_component/index";
import { connect } from "react-redux";

const sideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.close];

  if (props.show) {
    attachedClasses = [classes.SideDrawer, classes.open];
  }

  return (
    <Backdrop show={props.show} BackdropHandler={props.closed}>
      <div className={attachedClasses.join(" ")}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isUserAuthorised={props.isUserAuthorised} />
        </nav>
      </div>
    </Backdrop>
  );
};

const mapStateToProps = (state) => {
  return {
    isUserAuthorised: state.auth.token != null,
  };
};

export default connect(mapStateToProps)(sideDrawer);
