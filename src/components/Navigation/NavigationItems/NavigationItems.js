import React from "react";
import classnames from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = () => {
  return (
    <ul className={classnames.NavigationItems}>
      <NavigationItem exact link="/">
        BurgerBuilder
      </NavigationItem>
      <NavigationItem link="/orders">Orders</NavigationItem>
      <NavigationItem link="/auth">Authenticate</NavigationItem>
    </ul>
  );
};
export default NavigationItems;
