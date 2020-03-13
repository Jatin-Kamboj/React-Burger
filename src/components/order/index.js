import React from "react";
import classes from "./style.module.css";
import { string, element } from "prop-types";

export const OrderComponent = props => {
  // console.log("OrderComponent => ", props);
  const ingredients = props.ingredients;
  let displayIngredients = null;

  if (ingredients) {
    const data = Object.keys(ingredients)
      .map((element, index) => {
        return [...Array(ingredients[element])].map((obj, index) => {
          return { ingredient: element, amount: ingredients[element] };
        });
      })
      .reduce((prev, current) => prev.concat(current), []);

    displayIngredients = data.map((element, index) => {
      return (
        <span
          key={index}
          style={{
            textTransform: "capitalize",
            display: "inline-block",
            border: "1px solid grey",
            margin: "0 8px",
            padding: "5px"
          }}
        >
          {element.ingredient} {element.amount}
        </span>
      );
    });
  }

  /*const dd = [];
  for (const key in ingredients) {
    dd.push({ name: key, amount: ingredients[key] });
  }*/

  return (
    <div className={classes.order}>
      <p>Ingredients: {displayIngredients}</p>
      <p>
        Price : <strong>{Number.parseFloat(props.price).toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default OrderComponent;
