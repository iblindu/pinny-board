import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { connect } from "react-redux";
import { Card, Grid, Divider } from "semantic-ui-react";

class TemperatureCard extends Component {
  constructor(props) {
    super(props);

    this.state = { temperature: "" };
  }

  static propTypes = {
    micro: PropTypes.object.isRequired
  };

  componentDidMount() {
    const broker = "mqtt://mqtt-ardu-micro:f4d2cd04d09866df@broker.shiftr.io";
    const body = JSON.stringify({ broker });
    const config = {
      headers: {
        "Content-type": "application/json"
      }
    };
    axios
      .post("/api/connect/gettemp", body, config)
      .then(response => {
        this.setState({
          temperature: response.data.temperature
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    return (
      <div
        className="card bg-transparent"
        style={{ width: "15rem", border: "none" }}
      >
        <img
          src={require("../../assets/temperature.png")}
          className="card-img-top"
          style={{}}
        ></img>
        <div className="card-body d-flex justify-content-center">
          <h1 className="display-3 ">{this.state.temperature}°C</h1>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  micro: state.micro
});

export default connect(mapStateToProps)(TemperatureCard);
