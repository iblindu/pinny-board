import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router";
import { login } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
import { Alert } from "reactstrap";
import Navbar from "../Navbar";

class LoginPage extends Component {
  state = {
    email: "",
    password: "",
    msg: null
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      //Check for register error
      if (error.id === "LOGIN_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    if (isAuthenticated) {
      console.log("isAuthenticated");
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const { email, password } = this.state;
    const user = {
      email,
      password
    };

    //Attempt to login
    this.props.login(user);
  }

  render() {
    const titleDivStyle = {
      backgroundColor: "white",
      height: "50vh",
      width: "100vw",
      lineHeight: "50vh",
      paddingTop: "20vh"
    };

    const titleStyle = {
      color: "green",
      fontSize: "10vw",
      textAlign: "center"
    };

    const formDivStyle = {
      height: "40%",
      width: "50%",
      margin: "auto"
    };
    return (
      <div
        style={{
          height: "100%",
          width: "100%"
        }}
      >
        <div className="container" style={titleDivStyle}>
          <h1 style={titleStyle}>microsera</h1>
        </div>

        <div className="container" style={formDivStyle}>
          <div className="col-md-auto">
            <form name="form" onSubmit={e => this.onSubmit(e)}>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="email"
                  id="email"
                  value={this.state.email}
                  onChange={e => this.onChange(e)}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="password"
                  id="password"
                  value={this.state.password}
                  onChange={e => this.onChange(e)}
                />
              </div>
              <div className="form-group">
                <input
                  type="submit"
                  value="Login"
                  className="btn btn-outline-success"
                />
              </div>
            </form>
            {this.state.msg ? (
              <Alert color="danger">{this.state.msg}</Alert>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, { login, clearErrors })(LoginPage);
