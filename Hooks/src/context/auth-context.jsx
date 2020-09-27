import React, { useState } from "react";

const AuthContext = React.createContext({
  isAuth: false,
  login: () => {}
});

const AuthContextProvider = ({ children }) => {
  const [isAuth, setIsAuthorised] = useState(false);

  const login = () => {
    setIsAuthorised(true);
  };

  return (
    <AuthContext.Provider value={{ isAuth, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export default { AuthContext, AuthContextProvider };
