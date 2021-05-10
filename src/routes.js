import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Registro from "./pages/Registro/Registro";
import Home from "./pages/Home/Main";
import NotFound from "./pages/NotFound/NotFound";

export default (props) => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login}></Route>
          <Route path="/registro" component={Registro}></Route>
          <Route path="/home" component={Home}></Route>
          <Route component={NotFound}></Route>
        </Switch>
      </BrowserRouter>
    </>
  );
};