import React, { Fragment } from "react";
import { Route, Switch, Router } from "react-router-dom";
import Auth from "../../../components/containers/auth";
export const UserRoutes = () => {
  return (
    <Switch>
      <Route path="/auth" exact component={Auth} />
      />
    </Switch>
  );
};

// export default UserRoutes;
