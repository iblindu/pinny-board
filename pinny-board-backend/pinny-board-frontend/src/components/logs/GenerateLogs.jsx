import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import _ from "lodash";
import { Dropdown } from "semantic-ui-react";
import Logs from "./Logs";
class GenerateLogs extends Component {
  constructor() {
    super();
    this.state = {
      elements: [],
      logElement: ""
    };
  }
  static propTypes = {
    micro: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { selectedMicro } = this.props.micro;
    const id = selectedMicro;
    const body = JSON.stringify({ id });
    const config = {
      headers: {
        "Content-type": "application/json"
      }
    };

    axios
      .post("/api/connect/allElements", body, config)
      .then(response => {
        this.setState({ elements: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  render() {
    const { logElement } = this.state;
    const elementsDefinitions = this.state.elements;
    const elementsOptions = _.map(elementsDefinitions, elements => ({
      key: elements,
      text: elements,
      value: elements
    }));

    return (
      <div>
        <Dropdown
          required
          placeholder="Elements"
          search
          selection
          name="logElement"
          options={elementsOptions}
          value={logElement}
          onChange={this.handleChange}
        />
        <br />
        <br />
        {logElement ? <Logs element={logElement} /> : null}{" "}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  micro: state.micro,
  auth: state.auth
});

export default connect(mapStateToProps)(GenerateLogs);
