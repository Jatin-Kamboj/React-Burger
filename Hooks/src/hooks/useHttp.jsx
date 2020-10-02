import React, { useCallback, useReducer } from "react";

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

const useHttp = () => {
  const [httpState, dispatchHttp] = useReducer(httpReducer, {
    isLoading: false,
    error: null
  });

  /**
   * Shared an function with the other functional components to send the http request
   * thus utilsed it after using the hook in the component.
   */
  const sendRequest = useCallback(async (url, method, body) => {
    try {
      dispatchHttp({ type: "SEND" });
      const response = await fetch(url, {
        method,
        body,
        headers: {
          "Content-type": "application/json"
        }
      });

      const res = await response.json();

      dispatchHttp({ type: "RESPONSE" });

      return res;
    } catch (error) {
      return Promise.reject(error);
    }
  }, []);

  return { ...httpState, sendRequest };
};

export default useHttp;
