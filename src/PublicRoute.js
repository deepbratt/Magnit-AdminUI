import React from "react";
import { Route, useHistory } from "react-router";
import { connect } from "react-redux";

const PublicRoute = ({ component: Component, isLoggedIn, ...rest }) => {
  const history = useHistory();
  console.log(isLoggedIn);
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? history.push("/") : <Component {...props} />
      }
    />
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.persistedReducer.auth.isLoggedIn,
});

export default connect(mapStateToProps)(PublicRoute);
