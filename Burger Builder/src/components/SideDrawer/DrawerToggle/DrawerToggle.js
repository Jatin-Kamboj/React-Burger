import React from "react";
import classes from "./DrawerToggle.module.css";
import Logo from "../../Logo/Logo";

const drawerToggle = props => {
  return (
    <div className={classes.DrawerToggle} onClick={props.Clicked}>
      <div className={classes}></div>
      <div></div>
      <div></div>
    </div>
  );
};
export default drawerToggle;
