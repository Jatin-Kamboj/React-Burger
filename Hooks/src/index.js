import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import AuthContext from "./context/auth-context";

const { AuthContextProvider } = AuthContext;

ReactDOM.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>,
  document.getElementById("root")
);
