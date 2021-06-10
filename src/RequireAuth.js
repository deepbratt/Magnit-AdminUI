import React from "react";
import { Route } from "react-router";
import { connect } from "react-redux";
import Layout from "./components/Layout";

import { getToken } from "./Utils/form";
import  Login  from "./Pages/LoginPage";

const AuthRoute = ({ component: Component, isLoggedIn, ...rest }) => {
  console.log(isLoggedIn,"log");
  return (
    <Route
      {...rest}
      render={(props) =>
      getToken() ? (
          <Layout>
            <Component {...props} />
          </Layout>
        ) : ( 
        <Login/>
        )
      }
    />
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.rootReducer.auth.isLoggedIn,
});

export default connect(mapStateToProps)(AuthRoute);
