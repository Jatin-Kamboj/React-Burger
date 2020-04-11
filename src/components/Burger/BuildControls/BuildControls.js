import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";
const controls = [
  {
    label: "Salad",
    type: "salad",
  },
  {
    label: "Bacon",
    type: "bacon",
  },
  {
    label: "Cheese",
    type: "cheese",
  },
  {
    label: "Meat",
    type: "meat",
  },
];

const BuildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <p>
        Current Price: <strong>{props.price.toFixed(2)} </strong>
      </p>

      {controls.map((element) => {
        return (
          <BuildControl
            added={() => props.ingredientAdded(element.type)}
            removed={() => props.ingredientRemoved(element.type)}
            key={element.label}
            label={element.label}
            disabled={props.disabledInfo[element.type]}
          ></BuildControl>
        );
      })}
      <button
        disabled={!props.purchaseable}
        onClick={props.ordered}
        className={classes.OrderButton}
      >
        {props.isAuthorised ? "ORDER NOW" : "Login to Order"}
      </button>
    </div>
  );
};
export default BuildControls;
