import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import Todo from "./pages/Todo";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateTodo from "./pages/CreateTodo";
import ProtectedRoute from "./router/ProtectedRoute";
import RestrictRoute from "./router/RestrictRoute";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <RestrictRoute path="/" exact component={Home} />
        <RestrictRoute path="/login" component={Login} />
        <ProtectedRoute path="/profile" component={Todo} />
        <ProtectedRoute path="/add" component={CreateTodo} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
