import React, { Component } from "react";
import Switch from "react-switch";
import ControlM1 from "./ControlM1";
import ControlM2 from "./ControlM2";

class SwitchComponent extends Component {
  constructor() {
    super();
    this.state = { checked: false, value: "automat", code: "", type: "" };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked) {
    this.setState({ checked });
    if (checked) {
      this.setState({
        value: "manual"
      });
    } else {
      this.setState({ value: "automat" });
    }
  }

  render() {
    if (this.props.type === "M2" && this.state.checked)
      return (
        <div>
          <row>
            <Switch
              onChange={this.handleChange}
              checked={this.state.checked}
              uncheckedIcon=""
              checkedIcon=""
              onColor="#1f6023"
            />
            <p
              class="mb-3 text-capitalize font-weight-lighter"
              style={{ width: "40px" }}
            >
              {this.state.value}
            </p>
          </row>
          <ControlM2 type={this.props.type} code={this.props.code}></ControlM2>
        </div>
      );
    else if (this.props.type === "M1" && this.state.checked)
      return (
        <div>
          <row>
            <Switch
              onChange={this.handleChange}
              checked={this.state.checked}
              uncheckedIcon=""
              checkedIcon=""
              onColor="#1f6023"
            />
            <p
              class="mb-3 text-capitalize font-weight-lighter"
              style={{ width: "40px" }}
            >
              {this.state.value}
            </p>
          </row>
          <ControlM1 type={this.props.type} code={this.props.code}></ControlM1>
        </div>
      );
    else
      return (
        <row>
          <Switch
            onChange={this.handleChange}
            checked={this.state.checked}
            uncheckedIcon=""
            checkedIcon=""
            onColor="#1f6023"
          />
          <p
            class="mb-3 text-capitalize font-weight-lighter"
            style={{ width: "40px" }}
          >
            {this.state.value}
          </p>
        </row>
      );
  }
}

export default SwitchComponent;
