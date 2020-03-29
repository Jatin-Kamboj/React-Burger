import * as actionTypes from "../actions";

const intitalState = {
  ingredients: null,
  totalPrice: 0,
  purchaseable: false,
  error: false,
  errorMessage: null
};

const INGREDIENTS_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

const reducer = (state = intitalState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENTS:
      let val = {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.INGREDIENT]: state.ingredients[action.INGREDIENT] + 1
        },
        totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.INGREDIENT],
        purchaseable:
          state.totalPrice + INGREDIENTS_PRICES[action.INGREDIENT] > 0
      };
      return val;
    case actionTypes.REMOVE_INGREDIENTS:
      let vale = {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.INGREDIENT]: state.ingredients[action.INGREDIENT] - 1
        },
        totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.INGREDIENT],
        purchaseable:
          state.totalPrice - INGREDIENTS_PRICES[action.INGREDIENT] > 0
      };

      return vale;
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.ingredients,
        error: false,
        errorMessage: action.errorMessage
      };
    case actionTypes.remove_ingredient:
      return {
        ...state,
        error: true,
        errorMessage: action.errorMessage
      };
    default:
      return state;
      break;
  }
};

export default reducer;
