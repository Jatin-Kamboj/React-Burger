import * as actionTypes from "../index";
import { axiosInstance } from "../../../axios/axios";

export const add_ingredient = (ingredient) => {
  // console.log(ingredient);
  return {
    type: actionTypes.ADD_INGREDIENTS,
    INGREDIENT: ingredient,
  };
};

export const remove_ingredient = (ingredient) => {
  return {
    type: actionTypes.REMOVE_INGREDIENTS,
    INGREDIENT: ingredient,
  };
};

const set_ingredient = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients,
  };
};

const fetchIngredientsFailed = (error) => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
    errorMessage: error,
  };
};

const setIngredientsStart = (error) => {
  return {
    type: actionTypes.SET_INGREDIENTS_START,
    loading: true,
  };
};

export const initIngredients = (isAuthorised) => {
  return (dispatch) => {
    dispatch(setIngredientsStart());
    axiosInstance
      .get("/Ingredients.json")
      .then((response) => {
        dispatch(set_ingredient(response.data));
      })
      .catch((error) => {
        dispatch(fetchIngredientsFailed(error));
      });
  };
};
