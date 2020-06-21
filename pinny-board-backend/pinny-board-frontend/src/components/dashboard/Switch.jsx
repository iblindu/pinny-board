import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";

import ControlOne from "./ControlOne";
import ControlPlus from "./ControlPlus";
import Toggle from "./Toggle";
import { controlMicrosera } from "../../actions/microActions";

class SwitchComponent extends Component {
  constructor() {
    super();
    this.state = {
      checked: false,
      value: "AUTOMAT",
      code: String,
      type: String,
      client_id: String
    };
    this.handleChange = this.handleChange.bind(this);
  }

  static propTypes = {
    micro: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    controlMicrosera: PropTypes.func.isRequired
  };
  componentDidMount() {
    const client_id = this.props.client_id;
    this.setState({ client_id });
  }
  handleChange = event => {
    const { selectedMicro } = this.props.micro;
    const { user } = this.props.auth;
    const micro_id = selectedMicro;
    const user_id = user.id;
    const user_name = user.name;
    const user_email = user.email;
    const client_id = this.props.client_id;
    const element = "manual";
    var value;

    this.setState({ checked: event.target.checked });
    if (this.state.checked) {
      this.setState({
        value: "AUTOMAT"
      });
      value = "0";
    } else {
      this.setState({ value: "MANUAL" });
      value = "1";
    }

    const newEvent = {
      micro_id,
      user_id,
      user_name,
      user_email,
      client_id,
      element,
      value
    };
    this.props.controlMicrosera(newEvent);
  };

  render() {
    if (this.props.type === "Plus" && this.state.checked)
      return (
        <div>
          <div style={{ paddingLeft: 15 }}>
            <Toggle
              handleCheckChildElement={this.handleChange}
              checked={this.state.checked}
              value={this.state.value}
              id={this.state.value}
            />
          </div>
          <ControlPlus client_id={this.props.client_id}></ControlPlus>
        </div>
      );
    else if (this.props.type === "One" && this.state.checked)
      return (
        <div>
          <div style={{ paddingLeft: 15 }}>
            <Toggle
              handleCheckChildElement={this.handleChange}
              checked={this.state.checked}
              value={this.state.value}
              id={this.state.value}
            />
          </div>
          <ControlOne client_id={this.props.client_id}></ControlOne>
        </div>
      );
    else
      return (
        <div style={{ paddingLeft: 15 }}>
          <Toggle
            handleCheckChildElement={this.handleChange}
            checked={this.state.checked}
            value={this.state.value}
            id={this.state.value}
          />
        </div>
      );
  }
}
const mapStateToProps = state => ({
  micro: state.micro,
  auth: state.auth
});

export default connect(mapStateToProps, { controlMicrosera })(SwitchComponent);
