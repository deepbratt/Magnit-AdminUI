import React from "react";
import { Route } from "react-router";
import { connect } from "react-redux";
import Login from "./pages/Login";
import Layout from "./components/Layout";

const AuthRoute = ({ component: Component, isLoggedIn, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <Layout>
            <Component {...props} />
          </Layout>
        ) : (
          <Login />
        )
      }
    />
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.rootReducer.auth.isLoggedIn,
});

export default connect(mapStateToProps)(AuthRoute);
