import React from "react";
import BurgerIngredients from "./BurgerIngredients/BurgerIngredients";
import classes from "./Burger.module.css";
import { element } from "prop-types";

const Burger = props => {
  var transformedIngredients = Object.keys(props.ingredients)
    .map((igKey, index) => {
      // Here we are taking the no of the ingredients value eg = salad :2 and it loops 2 times salad and add it to burger
      // and maping them that times
      return [...Array(props.ingredients[igKey])].map((element, index) => (
        <BurgerIngredients key={igKey + index} type={igKey} />
      ));
    })
    .reduce((prevValues, CurrentValue) => {
      return prevValues.concat(CurrentValue);
    }, []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please select Ingredients</p>;
  }

  return (
    <div className={classes.burger}>
      <BurgerIngredients type="bread-top" />
      {transformedIngredients}
      <BurgerIngredients type="bread-bottom" />
      {/*<BurgerIngredients type="bread-top" />
      <BurgerIngredients type="cheese" />
      <BurgerIngredients type="meat" />
      <BurgerIngredients type="bread-bottom" />*/}
    </div>
  );
};

export default Burger;
