import { BrowserRouter as Router, Switch , Route} from "react-router-dom";
import { pageRoutes } from "./Components/Path";
const Routes = () => {
  const routeArray = Object.values(pageRoutes);
  return (
      <Router>
          <Switch>

            {routeArray.map((prop, key) => {
              return (
                <Route
                  path={prop.path}
                  component={prop.component}
                  key={`route-${key}`}
                />
              );
            })}
          </Switch>
      </Router>
  );
};
export default Routes;
