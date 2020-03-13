import * as actionTypes from "../actions";

const intitalState = {
  ingredients: { bacon: 0, cheese: 0, meat: 0, salad: 0 },
  totalPrice: 0,
  purchaseable: false
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
      // console.log("ADD_INGREDIENTS => ", state.totalPrice);
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
      // console.log("ADD_INGREDIENTS val => ", val.totalPrice);
      return val;
    case actionTypes.REMOVE_INGREDIENTS:
      // console.log("REMOVE_INGREDIENTS => ", state.totalPrice);
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
      // console.log("REMOVE_INGREDIENTS val => ", vale.totalPrice, vale);
      return vale;

    default:
      return state;
      break;
  }
};

export default reducer;
