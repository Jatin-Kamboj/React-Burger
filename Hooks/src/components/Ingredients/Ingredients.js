import React, { useState } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";

function Ingredients() {
  const [ingredients, setIngredients] = useState([]);

  const addIngredientsHandler = newIngredient => {
    if (newIngredient) {
      setIngredients(previousIngredients => [
        ...previousIngredients,
        { id: Math.random(), ...newIngredient }
      ]);
    }
  };

  const removeHandler = (event, ingredientId) => {
    if (ingredientId) {
    }
  };
  console.log("ingredients", ingredients);
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
