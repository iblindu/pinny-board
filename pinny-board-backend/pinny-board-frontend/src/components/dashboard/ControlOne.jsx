import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import Toggle from "./Toggle";

class ControlOne extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      code: "",
      type: "",

      activities: []
    };

    this.handleCheckChildElement = this.handleCheckChildElement.bind(this);
  }

  static propTypes = {
    micro: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
  };

  componentDidMount() {
    this._isMounted = true;
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
    console.log(event.target.name);
    console.log(event.target.checked);
    console.log(event.target.value);
    let activities = this.state.activities;
    activities.forEach(activity => {
      if (activity.value === event.target.value) {
        console.log("a ajuns aici");
        activity.isChecked = event.target.checked;
      }
    });
    this.setState({ activities: activities });
  };

  render() {
    const { activities } = this.state;
    return (
      <form>
        {this.state.activities.map((activity, index) => {
          const { isChecked, name, value } = activity;
          console.log(activities);

          return (
            <Toggle
              handleCheckChildElement={this.handleCheckChildElement}
              checked={activity.isChecked}
              value={activity.value}
              id={activity.id}
            />
          );
        })}
      </form>
    );
  }
}
const mapStateToProps = state => ({
  micro: state.micro,
  auth: state.auth
});

export default connect(mapStateToProps)(ControlOne);
