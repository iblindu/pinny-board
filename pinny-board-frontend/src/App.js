import React, { Component } from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "./components/login/Login";
import Main from "./components/main/Main";

// import { loadUser } from "./actions/authActions";
// import authReducer from "./reducers/authReducer";

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/microsera" component={Main} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
