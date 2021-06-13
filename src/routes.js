import { Suspense } from "react";
import { Typography } from "@material-ui/core";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import RequireAuth from "./RequireAuth";
import { pagesRoutes, publicRoutes } from "./Utils/paths";
import PublicRoute from "./PublicRoute";

const Routes = () => {
  const privateRoutes = Object.values(pagesRoutes);
  const _publicRoutes = Object.values(publicRoutes);

  return (
    <Suspense fallback={<Typography styles="h4">Loading....</Typography>}>
      <Router>
        <Switch>
          {privateRoutes.map((route, index) => (
            <RequireAuth
              path={route.path}
              component={route.component}
              key={`route-${route.name}`}
              exact
            />
          ))}
          {_publicRoutes.map((route, index) => (
            <PublicRoute
              path={route.path}
              component={route.component}
              key={`route-${route.name}`}
              exact
            />
          ))}
        </Switch>
        {/* <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/forget-password">
          <ForgetPassword />
        </Route>
        <Route exact path="/reset-password">
          <ResetPassword />
        </Route> */}
      </Router>
    </Suspense>
  );
};

export default Routes;
