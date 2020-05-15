import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { connect } from "react-redux";
import { Card, Grid, Divider } from "semantic-ui-react";

class HumidityCard extends Component {
  constructor(props) {
    super(props);

    this.state = { humidity: "" };
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
      .post("http://localhost:4000/api/connect/gethum", body, config)
      .then(response => {
        this.setState({
          humidity: response.data.humidity
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    return (
      <Card fluid color="teal">
        <Card.Content>
          <div className="row">
            <div className="col-sm-6 ">
              <h1 className="display-3 ">{this.state.humidity}%</h1>
            </div>
            <div className="col-sm-4 ">
              <img
                src={require("../../assets/humidity.png")}
                height="100vh"
                widht="100vw"
              ></img>
            </div>
          </div>
        </Card.Content>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  micro: state.micro
});

export default connect(mapStateToProps)(HumidityCard);
