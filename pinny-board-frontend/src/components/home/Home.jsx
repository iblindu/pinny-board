import React, { Component } from "react";

import { Redirect } from "react-router";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import PropTypes from "prop-types";

import Navbar from "../bars/Navbar";
import Sidebar from "../bars/Sidebar";
import Dashboard from "../dashboard/Dashboard";
import Reports from "../reports/Reports";

class HomePage extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool
  };
  render() {
    if (!this.props.isAuthenticated) {
      return <Redirect to="/" />;
    } else
      return (
        <React.Fragment>
          <Router>
            <Navbar />
            <Sidebar />
            <Switch>
              <Route exact path="/dashboard" component={Dashboard} />
              <Route path="/reports" component={Reports} />
            </Switch>
          </Router>
        </React.Fragment>
      );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

// prettier-ignore
//connect allows us to get state from redux into a react component, when we use connect we have to export default connect(mapStateToProps, {any actions we wanna use})(Original Class)
export default connect(mapStateToProps)(HomePage);
