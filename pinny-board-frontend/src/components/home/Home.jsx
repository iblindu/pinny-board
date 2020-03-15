import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";

class HomePage extends Component {
  render() {
    return (
      <div className="col-md-6 col-md-offset-3">
        <Navbar />
        <h1>Hi!</h1>
        <p>You're logged in with React!!</p>

        <p>
          <Link to="/login">Logout</Link>
        </p>
      </div>
    );
  }
}

export default HomePage;
