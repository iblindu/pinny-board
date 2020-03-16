import React, { Component } from "react";
import { Link } from "react-router-dom";
import { NavItem } from "reactstrap";
import Logout from "./login/Logout";

class Navbar extends Component {
  state = {};
  render() {
    return (
      <nav className="navbar navbar-light bg-light navbar-expand-lg">
        <Link to="/" className="navbar-brand" color="green">
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

export default Navbar;
