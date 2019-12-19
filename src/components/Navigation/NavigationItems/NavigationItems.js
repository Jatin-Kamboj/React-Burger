import React from "react";
import classnames from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = () => {
  return (
    <ul className={classnames.NavigationItems}>
      <NavigationItem link="/" active>
        BurgerBuilder
      </NavigationItem>
      <NavigationItem link="/" active>
        Checkout
      </NavigationItem>
    </ul>
  );
};
export default NavigationItems;
