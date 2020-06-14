import React, { Component } from "react";
import ControlOne from "./ControlOne";
import ControlPlus from "./ControlPlus";
import Toggle from "./Toggle";

class SwitchComponent extends Component {
  constructor() {
    super();
    this.state = { checked: false, value: "AUTOMAT", code: "", type: "" };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = event => {
    this.setState({ checked: event.target.checked });
    if (this.state.checked) {
      this.setState({
        value: "AUTOMAT"
      });
    } else {
      this.setState({ value: "MANUAL" });
    }
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

export default SwitchComponent;
