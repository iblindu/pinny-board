import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
import { Alert } from "reactstrap";
import { StyleSheet, css } from "aphrodite/no-important";

class RegisterPage extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    msg: null
  };

  static propTypes = {
    isAdded: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error, isAdded } = this.props;
    if (error !== prevProps.error) {
      //Check for register error
      if (error.id === "REGISTER_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const { name, email, password } = this.state;

    //Create user object
    const newUser = {
      name,
      email,
      password
    };

    //Atempt to register
    this.props.register(newUser);
  }

  render() {
    //##########STYLE############//
    const styles = StyleSheet.create({
      formDivStyle: {
        margin: "auto",
        padding: 30
      },
      title: {
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: 24,
        color: "#7c7c7d",
        lineHeight: "30px",
        letterSpacing: 0.3,
        "@media (max-width: 768px)": {
          marginLeft: 36
        },
        "@media (max-width: 468px)": {
          fontSize: 20
        }
      }
    });

    //#########COMPONENT##########//
    return (
      <div>
        <div className={css(styles.formDivStyle)}>
          <div className="col-md-auto">
            <div className={css(styles.title)}> Add New User </div>

            <form name="form" onSubmit={e => this.onSubmit(e)}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="name"
                  id="name"
                  value={this.state.username}
                  onChange={e => this.onChange(e)}
                />
              </div>
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
                  value="Register"
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
  isAdded: state.auth.isAdded,
  error: state.error
});

export default connect(mapStateToProps, { register, clearErrors })(
  RegisterPage
);