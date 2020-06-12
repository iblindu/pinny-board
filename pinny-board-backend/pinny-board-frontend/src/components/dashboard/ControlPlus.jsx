import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import Toggle from "./Toggle";
import { Divider } from "semantic-ui-react";
import { controlMicrosera } from "../../actions/microActions";

class ControlPlus extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      client_id: "",
      type: "",
      activities: []
    };

    this.handleCheckChildElement = this.handleCheckChildElement.bind(this);
  }

  static propTypes = {
    micro: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    controlMicrosera: PropTypes.func.isRequired
  };

  componentDidMount() {
    this._isMounted = true;
    const client_id = this.props.client_id;
    this.setState({ client_id });

    const { selectedMicro } = this.props.micro;
    const microId = selectedMicro;

    var activities = [];
    activities.push(
      {
        id: 1,
        value: "Leds",
        isChecked: false
      },
      {
        id: 2,
        value: "Fans",
        isChecked: false
      },
      {
        id: 3,
        value: "TankSupply",
        isChecked: false
      },
      {
        id: 4,
        value: "Drain",
        isChecked: false
      },
      {
        id: 5,
        value: "WaterRecirculation",
        isChecked: false
      },
      {
        id: 6,
        value: "AutoWash",
        isChecked: false
      }
    );

    axios
      .get("/api/microsere/" + microId)
      .then(response => {
        if (this._isMounted) {
          const heating = response.data.heating;
          const electrovalvesNumber = response.data.electrovalves;

          var i;
          var id = 6;
          var value;

          for (i = 1; i <= electrovalvesNumber; i++) {
            value = "IrrigateLevel" + i;
            activities.push({
              id: id,
              value: value,
              isChecked: false
            });
            id = id + 1;
          }
          if (heating) {
            value = "Heating";
            activities.push({
              id: id,
              value: value,
              isChecked: false
            });
            id = id + 1;
          }

          this.setState({ activities: activities });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleCheckChildElement = event => {
    const { selectedMicro } = this.props.micro;
    const { user } = this.props.auth;
    const micro_id = selectedMicro;
    const user_id = user.id;
    const client_id = this.state.client_id;
    const element = event.target.value;
    var value;
    if (event.target.checked) {
      value = "1";
    } else {
      value = "0";
    }

    let activities = this.state.activities;
    activities.forEach(activity => {
      if (activity.value === event.target.value) {
        activity.isChecked = event.target.checked;
      }
    });
    this.setState({ activities: activities });

    const newEvent = {
      micro_id,
      user_id,
      client_id,
      element,
      value
    };

    this.props.controlMicrosera(newEvent);
  };

  render() {
    const { activities } = this.state;
    console.log(activities);
    return (
      <div style={{ maxWidth: 200 }}>
        <Divider />
        {this.state.activities.map(activity => {
          return (
            <div>
              {activity.value === "Heating" ? <Divider /> : null}

              <div style={{ paddingLeft: 15 }}>
                <Toggle
                  handleCheckChildElement={this.handleCheckChildElement}
                  checked={activity.isChecked}
                  value={activity.value}
                  id={activity.id}
                />
              </div>

              {activity.value === "Fans" ? <Divider /> : null}
              {activity.value === "AutoWash" ? <Divider /> : null}
            </div>
          );
        })}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  micro: state.micro,
  auth: state.auth
});

export default connect(mapStateToProps, { controlMicrosera })(ControlPlus);
