import React, { Component } from "react";
export default class Sidebar extends Component {
  state = {
    isOpen: true
  };

  renderSidebar = () => {
    if (!this.state.isOpen) {
      return null;
    }

    return (
      <div className="sidebar">
        <div className="sidebar-link">Home</div>
        <div className="sidebar-link">Dashboard</div>
        <div className="sidebar-link">Reports</div>
      </div>
    );
  };
  toggleSidebar = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  };
  render() {
    return (
      <div className="sidebar-container">
        {this.renderSidebar()}
        <div></div>
      </div>
    );
  }
}
