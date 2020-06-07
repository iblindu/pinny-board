import React, { Component } from "react";
import Switch from "react-switch";
import ControlOne from "./ControlOne";
import ControlPlus from "./ControlPlus";

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
    if (this.props.type === "Plus" && this.state.checked)
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
          <ControlPlus
            type={this.props.type}
            code={this.props.code}
          ></ControlPlus>
        </div>
      );
    else if (this.props.type === "One" && this.state.checked)
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
          <ControlOne
            type={this.props.type}
            code={this.props.code}
          ></ControlOne>
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
