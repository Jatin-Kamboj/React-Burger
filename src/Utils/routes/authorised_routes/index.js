import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
// import CheckoutComponent from "../../../components/containers/checkout_component";
// import OrdersComponent from "../../../components/orders";
// import LogOutComponent from "../../../components/containers/auth/logout_component";
const CheckoutComponent = lazy(() =>
  import("../../../components/containers/checkout_component")
);
const OrdersComponent = lazy(() => import("../../../components/orders"));
const LogOutComponent = lazy(() =>
  import("../../../components/containers/auth/logout_component")
);

export const AuthorisedRoutes = () => {
  return (
    <Switch>
      <Route
        path="/checkout"
        render={() => (
          <Suspense fallback={() => <div>loading...</div>}>
            <CheckoutComponent />
          </Suspense>
        )}
      />
      <Route
        path="/orders"
        render={() => (
          <Suspense fallback={() => <div>loading...</div>}>
            <OrdersComponent />
          </Suspense>
        )}
      />
      <Route
        path="/logout"
        render={() => (
          <Suspense fallback={() => <div>loading...</div>}>
            <LogOutComponent />
          </Suspense>
        )}
      />
    </Switch>
  );
};
