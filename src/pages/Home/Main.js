import React, { Component } from "react";
import { Route, NavLink, HashRouter } from "react-router-dom";
import Home from "./Home";
import Messages from "./Messages";
import Profile from "./Profile";
import "./Home.css";
import Icon from "./img/Icon.png";

class Main extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <div className="CupidoHome">
            <h1>Cupido Online</h1>
          </div>

          <ul className="header">
            <li>
              <NavLink exact to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/messages">Mensagens</NavLink>
            </li>
            <li>
              <NavLink to="/profile">Perfil</NavLink>
            </li>
          </ul>
          <div className="content">
            <Route exact path="/" component={Home} />
            <Route path="/messages" component={Messages} />
            <Route path="/profile" component={Profile} />
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default Main;
