import * as actionTypes from "../../actions";

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
  error: null
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return {
        ...state,
        orders: state.orders.concat({
          id: action.orderId,
          ...action.orderData,
          purchased: true
        })
      };
      break;
    case actionTypes.PURCHASE_BURGER_FAIL:
      return {
        ...state,
        loading: false,
        purchased: false
      };
      break;
    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true,
        purchased: true
      };
      break;
    case actionTypes.PURCHASE_INIT:
      return {
        ...state,
        purchased: false
      };
      break;
    case actionTypes.FETCH_ORDERS_START:
      return {
        ...state,
        loading: true
      };
      break;
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.orders
      };
      break;
    case actionTypes.FETCH_ORDERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
      break;
    default:
      return state;
      break;
  }
};

export default orderReducer;
