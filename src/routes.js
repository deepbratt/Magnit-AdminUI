import { lazy, Suspense } from "react";
import { Typography } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RequireAuth from "./RequireAuth";
import { pagesRoutes } from "./Utils/paths";
const ForgetPassword = lazy(() => import("./pages/ForgetPassword"));
const Login = lazy(() => import("./pages/Login"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));

const Routes = () => {
  const routeArray = Object.values(pagesRoutes);
  console.log(
    "paths",
    routeArray.map((route) => route.path)
  );
  return (
    <Suspense fallback={<Typography styles="h4">Loading....</Typography>}>
      <Router>
        <Switch>
          {routeArray.map((route, index) => (
            <RequireAuth
              path={route.path}
              component={route.component}
              key={`route-${route.name}`}
              exact
            />
          ))}
        </Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/forget-password">
          <ForgetPassword />
        </Route>
        <Route exact path="/reset-password">
          <ResetPassword />
        </Route>
      </Router>
    </Suspense>
  );
};

export default Routes;
