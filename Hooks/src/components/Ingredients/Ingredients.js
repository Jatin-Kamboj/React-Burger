import React, { useState, useEffect, useCallback, useReducer } from "react";
import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import ErrorModal from "../UI/ErrorModal";
import Search from "./Search";

const ingredientsActions = ["SET", "DELETE", "ADD"];

/**
 * Ingredients reducer will be used to manage all the state manipulation of the ingredients over here
 * @param {Object} currentIngredients Ingredients value by default
 * @param {Object} action Actions payload which contains the payload for the action dispatched
 */
const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case "ADD":
      return [...currentIngredients, action.ingredient];
    case "DELETE":
      return currentIngredients.filter(ing => ing.id !== action.id);
    case "SET":
      return action.ingredients;
    default:
      throw new Error("Not reached there...");
  }
};

/**
 * Http Reducer will be used to handle all the state updation for the http requests in the component
 * @param {Object} state Initial State of the reducer
 * @param {Object} action Actions payload for the action dispatched and then update the state of the reducer
 */
export const httpReducer = (state, action) => {
  switch (action.type) {
    case "SEND":
      return { ...state, isLoading: true, error: null };

    case "RESPONSE":
      return { ...state, isLoading: false };

    case "ERROR":
      return { ...state, isLoading: false, error: action.errorMessage };

    default:
      throw new Error("Invalid httpReducer action dispatched");
  }
};

function Ingredients(props) {
  const [ingredients, dispatch] = useReducer(ingredientReducer, []);
  // const [ingredients, setIngredients] = useState([]);
  const [httpState, dispatchHttp] = useReducer(httpReducer, {
    isLoading: false,
    error: null
  });
  const { isLoading, error } = httpState;
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState();
  // console.log("ingredients", ingredients);
  const addIngredientsHandler = async newIngredient => {
    if (newIngredient) {
      try {
        dispatchHttp({ type: "SEND" });
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
        dispatchHttp({ type: "RESPONSE" });
      } catch (error) {
        // console.log("error", error.message);
        // setIsLoading(false);
        // setError(error.message);
        dispatchHttp({ type: "ERROR", errorMessage: error.message });
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
        // console.log("removeHandler", response);
      } catch (error) {
        // console.log("removeHandler error", error);
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
    // setError(null);
    dispatchHttp({ type: "ERROR", errorMessage: null });
  };

  // console.log("ingredients :>> ", ingredients);
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
