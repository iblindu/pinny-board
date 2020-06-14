import React, { Component } from "react";
import Logout from "../../login/Logout";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import IconBell from "../../../assets/icon-bell";
import IconSettings from "../../../assets/icon-settings";

class NavbarComponent extends Component {
  state = {};

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  render() {
    const { user } = this.props.auth;

    return (
      <nav className="navbar navbar-expand-lg navbar-light" role="navigation">
        <ul className="nav ml-auto">
          <li className="nav-item dropdown">
            <span
              className="nav-link dropdown-toggle"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              style={{ color: "green", cursor: "pointer" }}
            >
              {user.name}
            </span>
            <div
              className="dropdown-menu dropdown-menu-right"
              aria-labelledby="navbarDropdown"
            >
              <span className="dropdown-item" style={{ cursor: "pointer" }}>
                >
                <Logout />
              </span>
            </div>
          </li>
          <li className="nav-item">
            <span className="nav-link" style={{ cursor: "pointer" }}>
              <IconBell />
            </span>
          </li>
          {user.role === "administrator" ? (
            <li className="nav-item dropdown">
              <span
                className="nav-link"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                style={{ cursor: "pointer" }}
              >
                <IconSettings />
              </span>
              <div
                className="dropdown-menu dropdown-menu-right"
                aria-labelledby="navbarDropdown"
              >
                <a className="dropdown-item" href="/home/users">
                  Users
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="/home">
                  Microsere
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="/home/plants">
                  Plants
                </a>
              </div>
            </li>
          ) : null}
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(NavbarComponent);
