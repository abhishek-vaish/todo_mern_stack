import React from "react";
import { Redirect, Route } from "react-router-dom";
import { isAuthenticated } from "../helper/helper";

const ProtectedRoute = ({ component: Component, ...restOfProps }) => {
  return (
    <div>
      <Route
        {...restOfProps}
        render={() =>
          isAuthenticated() ? <Component /> : <Redirect to="/login" />
        }
      />
    </div>
  );
};

export default ProtectedRoute;
