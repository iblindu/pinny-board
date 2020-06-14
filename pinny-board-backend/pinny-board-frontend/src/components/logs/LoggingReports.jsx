import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";
import GenerateLogs from "./GenerateLogs";
import { Divider } from "semantic-ui-react";

class LoggingReports extends Component {
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
    micro: PropTypes.object.isRequired
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

    if (!selectedMicro)
      return (
        <div>
          <h1 className="display-4">EROARE LA CONECTARE </h1>
        </div>
      );
    else
      return (
        <div>
          <h1 className="display-4 text-capitalize">Logging Reports</h1>
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
          <Divider style={{ width: "70vw" }} />
          <GenerateLogs />
        </div>
      );
  }
}
const mapStateToProps = state => ({
  micro: state.micro,
  error: state.error
});

export default connect(mapStateToProps)(LoggingReports);
