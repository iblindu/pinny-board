import React, { Component } from "react";
import Switch from "react-switch";

import { Divider } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import GenerateReports from "./GenerateReports";
class SalesAndProduction extends Component {
  constructor() {
    super();

    this.state = {
      report: "sales",
      street: "",
      number: "",
      city: "",
      facility: "",
      code: "",
      type: "",
      checked: false
    };
    this.handleChange = this.handleChange.bind(this);
  }
  static propTypes = {
    micro: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { selectedMicro } = this.props.micro;
    const microId = selectedMicro;

    axios
      .get("/api/microsere/" + microId)
      .then(response => {
        this.setState({
          street: response.data.address.street,
          number: response.data.address.number,
          city: response.data.address.city,
          facility: response.data.address.facility,
          code: response.data.address.code,
          type: response.data.type
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleChange(checked) {
    this.setState({ checked });
    if (checked) {
      this.setState({
        report: "production"
      });
    } else {
      this.setState({ report: "sales" });
    }
  }

  render() {
    const { report } = this.state;
    return (
      <div>
        <h1 className="display-4 text-capitalize">{report} reports</h1>
        <Switch
          onChange={this.handleChange}
          checked={this.state.checked}
          uncheckedIcon=""
          checkedIcon=""
          onColor="#1f6023"
          offColor="#1f6023"
        />{" "}
        <Divider style={{ width: "70vw" }} />
        <p
          style={{
            fontFamily: "nunito",
            fontSize: 20,
            margin: 0
          }}
        >
          {this.state.facility} - Microsera {this.state.type}
        </p>
        <p
          style={{
            fontFamily: "nunito",
            fontSize: 15,
            fontWeight: "light",
            color: "#8F8F91",
            marginTop: 0
          }}
        >
          {this.state.city}, {this.state.street}, {this.state.number}
        </p>
        <Divider style={{ width: "70vw" }} />{" "}
        <GenerateReports report={report}></GenerateReports>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  micro: state.micro,
  auth: state.auth
});

export default connect(mapStateToProps)(SalesAndProduction);
