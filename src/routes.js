import { Suspense } from "react";
import { Typography } from "@material-ui/core";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import RequireAuth from "./RequireAuth";
import { pagesRoutes } from "./Utils/paths";

const Routes = () => {
  const routeArray = Object.values(pagesRoutes);
  console.log("paths",routeArray.map(route => route.path));
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
      </Router>
    </Suspense>
  );
};

export default Routes;
