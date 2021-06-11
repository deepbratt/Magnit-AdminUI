import React from "react";
import { Redirect, Route, useHistory } from "react-router";
import { connect } from "react-redux";
import Layout from "./components/Layout";

const AuthRoute = ({ component: Component, isLoggedIn, ...rest }) => {
  const history = useHistory();
  console.log(isLoggedIn);
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <Layout>
            <Component {...props} />
          </Layout>
        ) : (
          history.push("/login")
        )
      }
    />
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.persistedReducer.auth.isLoggedIn,
});

export default connect(mapStateToProps)(AuthRoute);
