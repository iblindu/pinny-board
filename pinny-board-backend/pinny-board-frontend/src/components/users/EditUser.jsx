import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import axios from "axios";
import _ from "lodash";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Alert } from "reactstrap";
import { StyleSheet, css } from "aphrodite/no-important";

import { Dropdown, Form } from "semantic-ui-react";

import { editUser } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

class EditUser extends Component {
  state = {
    id: "",
    name: "",
    email: "",
    password: "",
    chosenMicrosere: [],
    microsere: [],
    role: "",
    msg: null
  };

  static propTypes = {
    isUserEdited: PropTypes.bool,
    error: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    editUser: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { selectedUser } = this.props.auth;
    const userId = selectedUser;
    this.setState({ id: userId });
    axios
      .get("/api/users/" + userId)
      .then(response => {
        this.setState({
          name: response.data.name,
          email: response.data.email,
          chosenMicrosere: response.data.microsere,
          role: response.data.role
        });
      })
      .catch(function(error) {
        console.log(error);
      });
    axios.get("/api/microsere/all").then(response => {
      if (response.data.length > 0) {
        this.setState({
          microsere: response.data.map(microsera => microsera.code)
        });
      }
    });
  }
  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      //Check for register error
      if (error.id === "REGISTER_FAIL") {
        this.setState({ msg: error.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => {
    const { id, name, email, password, chosenMicrosere, role } = this.state;
    // const microsere = JSON.stringify(chosenMicrosere);
    const newUser = {
      id,
      name,
      email,
      password,
      chosenMicrosere,
      role
    };
    this.props.editUser(newUser);
  };
  renderRedirect = () => {
    const { isUserEdited } = this.props.auth;
    if (isUserEdited === true) {
      return <Redirect to="/home/users" />;
    }
  };

  render() {
    //##########STYLE############//
    const styles = StyleSheet.create({
      formDivStyle: {
        margin: "auto",
        padding: 30,
        maxWidth: "800px"
      }
    });
    const microDefinitions = this.state.microsere;
    const microOptions = _.map(microDefinitions, microsera => ({
      key: microsera,
      text: microsera,
      value: microsera
    }));
    const roleDefinitions = [
      "administrator",
      "client",
      "urban-gardner",
      "technical"
    ];
    const roleOptions = _.map(roleDefinitions, role => ({
      key: role,
      text: role,
      value: role
    }));

    const { name, email, password, chosenMicrosere, role } = this.state;
    //#########COMPONENT##########//
    return (
      <div className={css(styles.formDivStyle)}>
        <h1 className="display-4">Edit User</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            placeholder="Name"
            name="name"
            value={name}
            onChange={this.handleChange}
          />
          <Form.Input
            placeholder="Email"
            name="email"
            icon="user"
            type="email"
            value={email}
            onChange={this.handleChange}
          />
          <Form.Input
            placeholder="New Password"
            icon="lock"
            name="password"
            type="password"
            value={password}
            onChange={this.handleChange}
          />

          <Dropdown
            placeholder="Role"
            search
            selection
            name="role"
            options={roleOptions}
            value={role}
            onChange={this.handleChange}
          />

          {role === "client" || role === "urban-gardner" ? (
            <div>
              <br />
              <Dropdown
                placeholder="Microsera"
                fluid
                search
                multiple
                selection
                name="chosenMicrosere"
                options={microOptions}
                value={chosenMicrosere}
                onChange={this.handleChange}
              />
            </div>
          ) : null}
          <br />
          <br />
          {this.state.msg ? (
            <Alert color="danger">{this.state.msg}</Alert>
          ) : null}
          <Form.Button content="Submit" />
        </Form>

        {this.renderRedirect()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error
});

export default connect(mapStateToProps, { editUser, clearErrors })(EditUser);
