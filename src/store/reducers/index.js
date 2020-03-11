import * as actionTypes from "../actions";

const intitalState = {
  ingredients: { bacon: 0, cheese: 0, meat: 0, salad: 0 },
  totalPrice: 4
};

const reducer = (state = intitalState, action) => {
  console.log("reducer => ", action);
  switch (action.type) {
    case actionTypes.ADD_INGREDIENTS:
      let val = {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.INGREDIENT]: state.ingredients[action.INGREDIENT] + 1
        }
      };

      return val;
    case actionTypes.REMOVE_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.INGREDIENT]: state.ingredients[action.INGREDIENT] - 1
        }
      };
    default:
      return state;
      break;
  }
};

export default reducer;
