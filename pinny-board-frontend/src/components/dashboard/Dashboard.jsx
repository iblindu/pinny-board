import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Dashboard extends Component {
  state = {};

  static propTypes = {
    micro: PropTypes.object.isRequired
  };
  render() {
    const { selectedMicro } = this.props.micro;
    return (
      <div>
        <p>This is a paragraph and I am writing on the Dashboard</p>
        <p>Avem selectata microsera {selectedMicro} </p>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  micro: state.micro,
  error: state.error
});

export default connect(mapStateToProps)(Dashboard);
