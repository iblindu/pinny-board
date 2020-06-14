import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import Toggle from "./Toggle";
import { Divider } from "semantic-ui-react";
import { controlMicrosera } from "../../actions/microActions";
class ControlOne extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      client_id: String,
      user_id: String,
      user_email: String,
      type: String,
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

    const { user } = this.props.auth;
    const id = user.id;
    axios
      .get("/api/users/" + id)
      .then(response => {
        this.setState({
          user_name: response.data.name,
          user_email: response.data.email
        });
      })
      .catch(error => {
        console.log(error);
      });

    const { selectedMicro } = this.props.micro;
    const microId = selectedMicro;

    var activities = [];
    activities.push(
      {
        id: 1,
        value: "WaterPump",
        isChecked: false
      },
      {
        id: 2,
        value: "SupplyElectrovalve",
        isChecked: false
      }
    );

    axios
      .get("/api/microsere/" + microId)
      .then(response => {
        if (this._isMounted) {
          const ledsNumber = response.data.leds;
          const fansNumber = response.data.fans;

          var i;
          var id = 3;
          var value;

          for (i = 1; i <= ledsNumber; i++) {
            value = "Led" + i;
            activities.push({
              id: id,
              value: value,
              isChecked: false
            });
            id = id + 1;
          }
          for (i = 1; i <= fansNumber; i++) {
            value = "Fan" + i;
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
    const { client_id, user_name, user_email } = this.state;

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
      user_name,
      user_email,
      client_id,
      element,
      value
    };

    this.props.controlMicrosera(newEvent);
  };

  render() {
    return (
      <div style={{ maxWidth: 200 }}>
        <Divider />
        {this.state.activities.map(activity => {
          return (
            <div>
              {activity.value === "Led1" ? <Divider /> : null}
              {activity.value === "Fan1" ? <Divider /> : null}
              <div style={{ paddingLeft: 15 }}>
                <Toggle
                  handleCheckChildElement={this.handleCheckChildElement}
                  checked={activity.isChecked}
                  value={activity.value}
                  id={activity.id}
                />
              </div>
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

export default connect(mapStateToProps, { controlMicrosera })(ControlOne);
