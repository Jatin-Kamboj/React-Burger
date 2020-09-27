import React, { useContext } from "react";
import Ingredients from "./components/Ingredients/Ingredients";
import Context from "./context/auth-context";
import Auth from "./components/Auth";

const { AuthContext } = Context;

const App = props => {
  const { isAuth, login } = useContext(AuthContext);

  if (!isAuth) {
    return <Auth />;
  }

  return <Ingredients />;
};

export default App;
