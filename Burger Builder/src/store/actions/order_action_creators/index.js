import { axiosInstance } from "../../../axios/axios";
import * as actionTypes from "../index";

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderData: orderData,
    orderId: id,
  };
};

// These are the synchronous action creators
export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error,
  };
};

// These are the synchronous action creators
export const purchaseBurger = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};

//Creating async action creators
export const purchaseBurgerStart = (orderData, token) => {
  return {
    type: actionTypes.PURCHASE_BURGER,
    orderData: orderData,
    token: token,
  };

  // Moved the below side effects code in the Redux Saga
  // return (dispatch) => {
  //   dispatch(purchaseBurger());
  //   axiosInstance
  //     .post("/orders.json?auth=" + token, orderData)
  //     .then((response) => {
  //       dispatch(purchaseBurgerSuccess(response.data.name, orderData));
  //     })
  //     .catch((error) => {
  //       dispatch(purchaseBurgerFail(error));
  //     });
  // };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders,
  };
};

export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error,
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};

export const fetchOrders = (token, userId) => {
  return {
    type: actionTypes.FETCH_ORDERS,
    token: token,
    userId: userId,
  };
  // return (dispatch) => {
  //   dispatch(fetchOrdersStart());
  //   const queryParams =
  //     "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
  //   axiosInstance
  //     .get("/orders.json" + queryParams)
  //     .then((response) => {
  //       let fetchOrders = [];
  //       for (const key in response.data) {
  //         fetchOrders.push({ ...response.data[key], id: key });
  //       }
  //       dispatch(fetchOrdersSuccess(fetchOrders));
  //     })
  //     .catch((error) => {
  //       dispatch(fetchOrdersFail(error));
  //     });
  // };
};

export const deleteOrderSuccess = (id) => {
  return { type: actionTypes.DELETE_ORDER, orderId: id };
};

// export const deleteOrder = () => {
//   return dispatch => {
//     axiosInstance
//       .delete("/orders.json/name")
//       .then(response => {
//         let fetchOrders = [];
//         for (const key in response.data) {
//           fetchOrders.push({ ...response.data[key], id: key });
//         }
//         dispatch(fetchOrdersSuccess(fetchOrders));
//       })
//       .catch(error => {
//         dispatch(fetchOrdersFail(error));
//       });
//   };
// };
