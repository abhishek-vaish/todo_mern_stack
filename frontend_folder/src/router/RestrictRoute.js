import React from "react";
import { Redirect, Route } from "react-router";

const RestrictRoute = ({ component: Component, ...restOfProps }) => {
  const user = localStorage.getItem("validationToken");
  return (
    <Route
      {...restOfProps}
      render={() => (user ? <Redirect to="/profile" /> : <Component />)}
    />
  );
};

export default RestrictRoute;
