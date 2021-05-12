import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Register from "./containers/Register";
import NewMessage from "./containers/NewMessage";
import Messages from "./containers/Messages";
import AuthenticatedRoute from "./components/AuthenticatedRoute/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute/UnauthenticatedRoute";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <UnauthenticatedRoute exact path="/login">
        <Login />
      </UnauthenticatedRoute>
      <UnauthenticatedRoute exact path="/register">
        <Register />
      </UnauthenticatedRoute>
      <AuthenticatedRoute exact path="/messages/new">
        <NewMessage />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/messages/:id">
        <Messages />
      </AuthenticatedRoute>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}
