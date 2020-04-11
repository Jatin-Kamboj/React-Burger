import * as actionTypes from "../actions";
import { updateObject } from "../../Utils/redux_utils";

const intitalState = {
  ingredients: null,
  totalPrice: 0,
  purchaseable: false,
  error: false,
  errorMessage: null,
  isBuilding: false,
};

const INGREDIENTS_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const setIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: action.ingredients,
    totalPrice: 0,
    error: false,
    isBuilding: false,
    errorMessage: action.errorMessage,
  });
};

const reducer = (state = intitalState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENTS:
      const updatedIngredient = {
        [action.INGREDIENT]: state.ingredients[action.INGREDIENT] + 1,
      };
      const updatedIngredients = updateObject(state, updatedIngredient);
      let val = {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.INGREDIENT]: state.ingredients[action.INGREDIENT] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.INGREDIENT],
        purchaseable:
          state.totalPrice + INGREDIENTS_PRICES[action.INGREDIENT] > 0,
        isBuilding:
          state.totalPrice - INGREDIENTS_PRICES[action.INGREDIENT] > 0,
      };
      return val;
    case actionTypes.REMOVE_INGREDIENTS:
      let vale = {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.INGREDIENT]: state.ingredients[action.INGREDIENT] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.INGREDIENT],
        purchaseable:
          state.totalPrice - INGREDIENTS_PRICES[action.INGREDIENT] > 0,
        isBuilding:
          state.totalPrice - INGREDIENTS_PRICES[action.INGREDIENT] > 0,
      };

      return vale;
    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);
    case actionTypes.remove_ingredient:
      return {
        ...state,
        error: true,
        errorMessage: action.errorMessage,
      };
    default:
      return state;
      break;
  }
};

export default reducer;
