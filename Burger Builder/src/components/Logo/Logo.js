import React from "react";
import classes from "./Logo.module.css";
import BurgerImage from "../../assets/images/burger-logo.png";

const Logo = props => {
  return (
    <div className={classes.Logo}>
      <img src={BurgerImage} alt="BurgerImage" />
    </div>
  );
};

export default Logo;
