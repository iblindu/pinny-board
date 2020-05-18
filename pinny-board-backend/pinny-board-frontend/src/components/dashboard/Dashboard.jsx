import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";
import { Card } from "semantic-ui-react";
import TemperatureCard from "./TemperatureCard";
import HumidityCard from "./HumidityCard";
import SwitchComponent from "./Switch";

class Dashboard extends Component {
  constructor() {
    super();

    this.state = {
      street: "",
      number: "",
      city: "",
      facility: "",
      code: "",
      type: ""
    };
  }

  static propTypes = {
    micro: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { selectedMicro } = this.props.micro;
    const code = selectedMicro;
    const body = JSON.stringify({ code });
    const config = {
      headers: {
        "Content-type": "application/json"
      }
    };
    console.log(body);
    axios
      .post("http://localhost:4000/api/microsere/find", body, config)
      .then(response => {
        this.setState({
          street: response.data.street,
          number: response.data.number,
          city: response.data.city,
          facility: response.data.facility,
          code: response.data.code,
          type: response.data.type
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { selectedMicro } = this.props.micro;
    if (!selectedMicro)
      return (
        <div>
          <h1 className="display-4">EROARE LA CONECTARE </h1>
        </div>
      );
    else
      return (
        <div>
          <div>
            <h1 className="display-4">{this.state.facility}</h1>
            <p className="font-weight-lighter">
              {this.state.city}, {this.state.street}, {this.state.number},{" "}
              {this.state.type}
            </p>
          </div>
          <br />
          <br />
          <div>
            <Card.Group>
              <div class="col-sm-4">
                <TemperatureCard />
              </div>
              <div class="col-sm-4">
                <HumidityCard />
              </div>
            </Card.Group>
          </div>
          <br />
          <br />
          <div col-sm-6>
            <SwitchComponent
              type={this.state.type}
              code={this.state.code}
            ></SwitchComponent>
          </div>
        </div>
      );
  }
}
const mapStateToProps = state => ({
  micro: state.micro,
  error: state.error
});

export default connect(mapStateToProps)(Dashboard);
