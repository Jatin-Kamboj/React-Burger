import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Router, BrowserRouter } from "react-router-dom";
import App from "./App";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import reducer from "./store/reducers";
import orderReducer from "./store/reducers/order_reducer";
import authReducer from "./store/reducers/auth_reducer";
import thunk from "redux-thunk";
import { reducer as formReducer } from "redux-form";
import "../src/styles/style.css";
import { createBrowserHistory as createHistory } from "history";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
  burgerBuilder: reducer,
  order: orderReducer,
  form: formReducer,
  auth: authReducer,
});
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
// console.log(
//   store.subscribe(() => {
//     console.log("getState() :", store.getState().burgerBuilder);
//   })
// );
// <Router history={history}>
// </Router>

const history = createHistory();
const app = (
  <Provider store={store}>
    <BrowserRouter basename={window.location.href}>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
