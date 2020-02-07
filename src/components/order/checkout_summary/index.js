import React from "react";
import classes from "./style.module.css";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import PropTypes from "prop-types";

export const CheckoutSummary = props => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well</h1>
      <div className={classes.checkorder}>
        <Burger ingredients={props.ingredients} />
      </div>
      <div>
        {" "}
        <Button buttonClass="Danger" onClick>
          CANCEL
        </Button>
        <Button buttonClass="Success" onClick>
          CONTINUE
        </Button>
      </div>
    </div>
  );
};

CheckoutSummary.prototype = {
  ingredients: PropTypes.object.isRequired
};
