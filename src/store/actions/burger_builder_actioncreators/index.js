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

export const set_ingredient = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients,
  };
};

export const fetchIngredientsFailed = (error) => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
    errorMessage: error,
  };
};

export const setIngredientsStart = (error) => {
  return {
    type: actionTypes.SET_INGREDIENTS_START,
    loading: true,
  };
};

export const initIngredients = () => {
  return {
    type: actionTypes.INT_INGREDIENTS,
  };
};
