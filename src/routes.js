import { lazy, Suspense } from "react";
import { Typography } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RequireAuth from "./RequireAuth";
import { pagesRoutes } from "./Utils/paths";
const Login = lazy(() => import("./pages/Login"));

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
          <Route exact path="/login">
            <Login />
          </Route>
        </Switch>
      </Router>
    </Suspense>
  );
};

export default Routes;
