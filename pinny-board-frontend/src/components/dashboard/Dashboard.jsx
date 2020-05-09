import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Dashboard extends Component {
  state = {
    type: "",
    address: ""
  };

  static propTypes = {
    micro: PropTypes.object.isRequired
  };

  render() {
    const { selectedMicro } = this.props.micro;
    return (
      <div>
        <h1 class="display-4">{selectedMicro.selectedMicro.facility}</h1>
        <p>
          {selectedMicro.selectedMicro.city},{" "}
          {selectedMicro.selectedMicro.street},{" "}
          {selectedMicro.selectedMicro.number}
        </p>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  micro: state.micro,
  error: state.error
});

export default connect(mapStateToProps)(Dashboard);
