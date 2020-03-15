import React, { Component } from "react";
import axios from "axios";
import { login } from "../../actions/authActions";

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      password: ""
    };
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    axios
      .post("/auth/getToken", {
        username: this.state.username,
        password: this.state.password
      })
      .then(res => localStorage.setItem("cool-jwt", res.data));
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
                  type="text"
                  className="form-control"
                  name="username"
                  placeholder="username"
                  value={this.state.username}
                  onChange={e => this.onChange(e)}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="password"
                  value={this.state.password}
                  onChange={e => this.onChange(e)}
                />
              </div>
              <div className="form-group">
                <input
                  type="submit"
                  value="login"
                  className="btn btn-outline-success"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
