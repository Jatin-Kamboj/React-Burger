import React from "react";
import classes from "./Toolbar.module.css";
import Logo from "../Logo/Logo";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";
import NavigationItems from "../Navigation/NavigationItems/NavigationItems";

const Toolbar = props => {
  return (
    <header className={classes.Toolbar}>
      <DrawerToggle Clicked={props.closed} />
      <div className={classes.Logo}>
        <Logo />
      </div>
      <nav className={classes.DesktopOnly}>
        <NavigationItems />
      </nav>
    </header>
  );
};
export default Toolbar;
