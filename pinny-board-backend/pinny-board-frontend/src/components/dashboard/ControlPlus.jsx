import React, { Component } from "react";
import Switch from "react-switch";
import axios from "axios";

class ControlPlus extends Component {
  constructor() {
    super();
    this.state = { code: "", type: "", checked: false };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked) {
    this.setState({ checked });
    const broker = "mqtt://mqtt-ardu-micro:f4d2cd04d09866df@broker.shiftr.io";
    const config = {
      headers: {
        "Content-type": "application/json"
      }
    };
    var value;

    if (checked) {
      value = "1";
    } else {
      value = "0";
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

export default ControlPlus;
