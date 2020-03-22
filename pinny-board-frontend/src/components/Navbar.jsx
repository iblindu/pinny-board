import React, { Component } from "react";
import { Link } from "react-router-dom";
import { NavItem } from "reactstrap";
import Logout from "./login/Logout";

import { connect } from "react-redux";
import PropTypes from "prop-types";

class Navbar extends Component {
  state = {};

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    return (
      <nav className="navbar navbar-light bg-light navbar-expand-lg">
        <Link to="/home" className="navbar-brand">
          Microsera
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/register" className="nav-link">
                Register User
              </Link>
            </li>
            <li className="navbar-item">
              <span className="navbar-text mr-3">
                <strong>{user ? `Welcome ${user.name}` : ""}</strong>
              </span>
            </li>
            <li className="navbar-item">
              <NavItem>
                <Logout />
              </NavItem>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(Navbar);
