import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./Pages/login";
import Register from "./Pages/register";
import Home from "./Pages/home";

export default class App extends Component {

  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/home" component={Home} />
          <Redirect to="/login" />
        </Switch>
      </div>
    );
  }
}
