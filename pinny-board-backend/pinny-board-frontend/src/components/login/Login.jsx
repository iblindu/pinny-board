import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router";
import { login } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
import { Alert } from "reactstrap";

import { Form } from "semantic-ui-react";

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
    const { error } = this.props;
    if (error !== prevProps.error) {
      //Check for register error
      if (error.id === "LOGIN_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => {
    const { email, password } = this.state;
    const user = {
      email,
      password
    };

    //Attempt to login
    this.props.login(user);
  };

  render() {
    //##########STYLE############//
    const titleDivStyle = {
      backgroundColor: "white",
      height: "50vh",
      width: "100vw",
      lineHeight: "50vh",
      paddingTop: "20vh"
    };

    const titleStyle = {
      color: "#1F6023",
      fontSize: "10vw",
      textAlign: "center"
    };

    const formDivStyle = {
      height: "40%",
      width: "50%",
      margin: "auto"
    };
    //#########COMPONENT##########//
    const { email, password } = this.state;
    if (this.props.isAuthenticated) {
      return <Redirect to="/home" />;
    } else
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
              <Form onSubmit={this.handleSubmit}>
                <Form.Input
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={this.handleChange}
                />
                <Form.Input
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={this.handleChange}
                />
                <Form.Button content="Login" />
              </Form>
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
