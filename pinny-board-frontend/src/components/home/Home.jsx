import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import Navbar from "../Navbar";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class HomePage extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool
  };

  render() {
    if (!this.props.isAuthenticated) {
      return <Redirect to="/" />;
    } else
      return (
        <div>
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

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

// prettier-ignore
//connect allows us to get state from redux into a react component, when we use connect we have to export default connect(mapStateToProps, {any actions we wanna use})(Original Class)
export default connect(mapStateToProps)(HomePage);
