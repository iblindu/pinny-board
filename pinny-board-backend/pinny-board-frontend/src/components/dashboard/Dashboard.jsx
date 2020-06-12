import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";
import { Card } from "semantic-ui-react";
import TemperatureCard from "./TemperatureCard";
import HumidityCard from "./HumidityCard";
import SwitchComponent from "./Switch";
import { Divider } from "semantic-ui-react";

class Dashboard extends Component {
  constructor() {
    super();

    this.state = {
      street: "",
      number: "",
      city: "",
      facility: "",
      type: "",
      client_id: ""
    };
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
          client_id: response.data.client_id,
          type: response.data.type,
          street: response.data.address.street,
          number: response.data.address.number,
          city: response.data.address.city,
          facility: response.data.address.facility
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { selectedMicro } = this.props.micro;
    const { user } = this.props.auth;
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
            <h1 className="display-4">
              {this.state.facility} - Microsera {this.state.type}
            </h1>
            <p className="font-weight-lighter">
              {this.state.city}, {this.state.street}, {this.state.number}
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
          {user.role === "administrator" ||
          user.role === "client" ||
          user.role === "technical" ? (
            <div col-sm-6>
              <Divider />
              <p
                style={{
                  fontFamily: "nunito",
                  fontSize: 30,
                  fontWeight: "light"
                }}
              >
                Control
              </p>
              <SwitchComponent
                type={this.state.type}
                client_id={this.state.client_id}
              ></SwitchComponent>
              <Divider />
              <p
                style={{
                  fontFamily: "nunito",
                  fontSize: 30,
                  fontWeight: "light"
                }}
              >
                Report
              </p>
            </div>
          ) : null}
        </div>
      );
  }
}
const mapStateToProps = state => ({
  micro: state.micro,
  auth: state.auth
});

export default connect(mapStateToProps)(Dashboard);
