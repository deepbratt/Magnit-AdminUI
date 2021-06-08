import { Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Layout from "./components/Layout";

const Routes = () => {
  const isLoggedIn = useSelector((state) => state.rootReducer.auth.isLoggedIn);
  return (
    <Router>
      <Switch>
        {isLoggedIn ? (
          <Typography>Welcome Admin</Typography>
        ) : (
          <Typography>Login Please</Typography>
        )}
      </Switch>
    </Router>
  );
};

export default Routes;
