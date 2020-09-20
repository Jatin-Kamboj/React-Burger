import React, { useState, useEffect, useCallback, useReducer } from "react";
import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import ErrorModal from "../UI/ErrorModal";
import Search from "./Search";

const ingredientsActions = ["SET", "DELETE", "ADD"];

const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case "ADD":
      return [...currentIngredients, action.ingredient];
    case "DELETE":
      return currentIngredients.filter(ing => ing.id !== action.id);
    case "SET":
      return action.ingredients;
    default:
      return "Not reached there...";
  }
};

function Ingredients(props) {
  const [ingredients, dispatch] = useReducer(ingredientReducer, [
    ingredientsActions
  ]);
  // const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const addIngredientsHandler = async newIngredient => {
    if (newIngredient) {
      try {
        setIsLoading(true);
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
        // setIngredients(previousIngredients => [
        //   ...previousIngredients,
        //   { id: res.name, ...newIngredient }
        // ]);
        dispatch({
          type: "ADD",
          ingredient: { id: res.name, ...newIngredient }
        });
        setIsLoading(false);
      } catch (error) {
        console.log("error", error.message);
        setIsLoading(false);
        setError(error.message);
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
        // setIngredients(previousIngredients =>
        //   previousIngredients.filter(
        //     ingredient => ingredient.id !== ingredientId
        //   )
        // );
        dispatch({ type: "DELETE", id: ingredientId });
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

  const onIngredientsFetch = useCallback(ingredients => {
    const ingredientsArr = [];
    let fetchedIngredients = Object.entries(ingredients);
    fetchedIngredients.forEach(([id, value]) =>
      ingredientsArr.push({ id, ...value })
    );
    dispatch({ type: ingredientsActions[0], ingredients: ingredientsArr });
    // setIngredients(ingredientsArr);
  }, []);

  // useEffect(() => {
  //   console.log("useEffect");
  //   fetchIngredients();
  // }, []);

  const removeErrors = () => {
    setError(null);
  };

  console.log("ingredients :>> ", ingredients);
  if (error) {
    return <ErrorModal onClose={removeErrors}>{error}</ErrorModal>;
  }
  return (
    <div className="App">
      <IngredientForm
        isLoading={isLoading}
        addIngredientsHandler={addIngredientsHandler}
      />
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
