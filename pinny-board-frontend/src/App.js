import React, { Component } from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "./components/login/Login";
import Home from "./components/home/Home";
import Register from "./components/register/Register";

// import { loadUser } from "./actions/authActions";
// import authReducer from "./reducers/authReducer";

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/home" component={Home} />
            <Route path="/register" component={Register} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
