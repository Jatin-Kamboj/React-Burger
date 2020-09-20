import React, { useState, useEffect, useCallback } from "react";
import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";

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

  const removeHandler = useCallback(async ingredientId => {
    if (ingredientId) {
      const deletedIngredient = ingredients.find(
        ingredient => ingredient.id === ingredientId
      );
      try {
        const response = await fetch(
          `https://covid-c1962.firebaseio.com/ingredients/${ingredientId}.json`,
          {
            method: "DELETE"
          }
        );
        console.log("removeHandler", response);
      } catch (error) {
        console.log("removeHandler error", error);
      }
      if (deletedIngredient) {
        setIngredients(previousIngredients =>
          previousIngredients.filter(
            ingredient => ingredient.id !== ingredientId
          )
        );
      }
    }
  });

  const fetchIngredients = async () => {
    try {
      const response = await fetch(
        "https://covid-c1962.firebaseio.com/ingredients.json"
      );
      let fetchedIngredients = await response.json();
      onIngredientsFetch(fetchedIngredients);
    } catch (error) {
      console.log(error);
    }
  };

  const onIngredientsFetch = useCallback(
    ingredients => {
      const ingredientsArr = [];
      let fetchedIngredients = Object.entries(ingredients);
      fetchedIngredients.forEach(([id, value]) =>
        ingredientsArr.push({ id, ...value })
      );
      setIngredients(ingredientsArr);
    },
    [setIngredients]
  );

  // useEffect(() => {
  //   console.log("useEffect");
  //   fetchIngredients();
  // }, []);
  console.log("ingredients :>> ", ingredients);
  return (
    <div className="App">
      <IngredientForm addIngredientsHandler={addIngredientsHandler} />
      <section>
        <Search onIngredientsFetch={onIngredientsFetch} />
        <IngredientList
          onRemoveItem={removeHandler}
          ingredients={ingredients}
        />
      </section>
    </div>
  );
}

export default Ingredients;
