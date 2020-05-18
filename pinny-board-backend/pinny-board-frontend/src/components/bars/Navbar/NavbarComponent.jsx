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
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              style={{ color: "green" }}
            >
              {user.name}
            </a>
            <div
              className="dropdown-menu dropdown-menu-right"
              aria-labelledby="navbarDropdown"
            >
              {/* <a className="dropdown-item" href="#">
                Edit Profile
              </a> 
              <div className="dropdown-divider"></div>*/}
              <a className="dropdown-item">
                <Logout />
              </a>
            </div>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <IconBell />
            </a>
          </li>
          {user.role === "administrator" ? (
            <li className="nav-item dropdown">
              <a
                className="nav-link"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <IconSettings />
              </a>
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
