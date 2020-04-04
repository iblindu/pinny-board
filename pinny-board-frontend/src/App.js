import React, { Component } from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "./components/login/Login";
import Home from "./components/main/Home";
import Microsera from "./components/main/Microsera";
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
            <Route path="/microsera" component={Microsera} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
