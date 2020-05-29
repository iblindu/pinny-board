import React, { Component } from "react";
import Switch from "react-switch";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";

class ControlM1 extends Component {
  constructor() {
    super();
    this.state = { code: "", type: "", checked: false };
    this.handleChange = this.handleChange.bind(this);
  }

  static propTypes = {
    micro: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
  };

  handleChange(checked) {
    this.setState({ checked });
    const broker = "mqtt://mqtt-ardu-micro:f4d2cd04d09866df@broker.shiftr.io";
    const config = {
      headers: {
        "Content-type": "application/json"
      }
    };
    var value;
    var value_meaning;

    if (checked) {
      value = "1";
      value_meaning = "on";
    } else {
      value = "0";
      value_meaning = "off";
    }
    const body = JSON.stringify({ broker, value });
    axios
      .post("/api/connect/power", body, config)
      .then()
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <Switch
          onChange={this.handleChange}
          checked={this.state.checked}
          onColor="#1f6023"
          uncheckedIcon=""
          checkedIcon=""
        />
        <span
          class="mb-3 text-capitalize font-weight-lighter"
          style={{ width: "40px" }}
        >
          POWER
        </span>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  micro: state.micro,
  auth: state.auth
});

export default connect(mapStateToProps)(ControlM1);
