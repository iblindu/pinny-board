import React, { Component } from "react";
import Switch from "react-switch";
import axios from "axios";

class ControlPlus extends Component {
  constructor() {
    super();
    this.state = { code: "", type: "", checked: false };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { selectedMicro } = this.props;
    const microId = selectedMicro;

    axios.get("/api/microsere/" + microId).then(response => {
      this.setState({
        electrovalves: response.data.electrovalves,
        heating: response.data.heating,
        levels: response.data.levels
      }).catch(error => {
        console.log(error);
      });
    });
  }

  handleChange(checked) {
    const { selectedMicro } = this.props.micro;
    const microId = selectedMicro;
    this.setState({ checked });
    // const broker = "mqtt://mqtt-ardu-micro:f4d2cd04d09866df@broker.shiftr.io";
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

    const body = JSON.stringify({ microId, value });
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
