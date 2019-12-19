import React from "react";
import classes from "./SideDrawer.module.css";
import NavigationItems from "../Navigation/NavigationItems/NavigationItems";
import Backdrop from "../UI/Backdrop/Backdrop";
import Logo from "../Logo/Logo";
import Aux from "../hoc/auxilary_component/index";

const sideDrawer = props => {
  let attachedClasses = [classes.SideDrawer, classes.close];

  if (props.show) {
    attachedClasses = [classes.SideDrawer, classes.open];
  }
  console.log(attachedClasses.join(" "));
  return (
    <Backdrop show={props.show} BackdropHandler={props.closed}>
      <div className={attachedClasses.join(" ")}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Backdrop>
  );
};

export default sideDrawer;
