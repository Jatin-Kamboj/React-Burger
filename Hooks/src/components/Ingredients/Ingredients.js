import React, { useState, useEffect } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";
import { tryStatement } from "@babel/types";

function Ingredients() {
  const [ingredients, setIngredients] = useState([]);

  const addIngredientsHandler = async newIngredient => {
    if (newIngredient) {
      try {
        const response = await fetch(
          "https://covid-c1962.firebaseio.com/ingredients.json",
          {
            method: "Post",
            body: JSON.stringify(newIngredient),
            headers: {
              "Content-type": "application/json"
            }
          }
        );
        const res = await response.json();
        setIngredients(previousIngredients => [
          ...previousIngredients,
          { id: res.name, ...newIngredient }
        ]);
      } catch (error) {
        console.log("error", error.message);
      }
    }
  };

  const removeHandler = ingredientId => {
    if (ingredientId) {
      const deletedIngredient = ingredients.find(
        ingredient => ingredient.id === ingredientId
      );

      if (deletedIngredient) {
        setIngredients(previousIngredients =>
          previousIngredients.filter(
            ingredient => ingredient.id !== ingredientId
          )
        );
      }
    }
  };

  const fetchIngredients = async () => {
    try {
      const response = await fetch(
        "https://covid-c1962.firebaseio.com/ingredients.json"
      );
      let fetchedIngredients = await response.json();
      const ingredientsArr = [];
      fetchedIngredients = Object.entries(fetchedIngredients);
      fetchedIngredients.forEach(([id, value]) =>
        ingredientsArr.push({ id, ...value })
      );
      setIngredients(ingredientsArr);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  return (
    <div className="App">
      <IngredientForm addIngredientsHandler={addIngredientsHandler} />
      <section>
        <Search />
        <IngredientList
          onRemoveItem={removeHandler}
          ingredients={ingredients}
        />
      </section>
    </div>
  );
}

export default Ingredients;
