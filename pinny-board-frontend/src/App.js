import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./components/login/Login";
import Home from "./components/home/Home";
import Register from "./components/register/Register";

import { Provider } from "react-redux";
import store from "./store";

import { loadUser } from "./actions/authActions";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <div>
          <BrowserRouter>
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/" exact component={Home} />
              <Route path="/register" exact component={Register} />
            </Switch>
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
}

export default App;
