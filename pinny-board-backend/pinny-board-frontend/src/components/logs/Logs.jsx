import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import { StyleSheet, css } from "aphrodite/no-important";

class Logs extends Component {
  constructor() {
    super();

    this.state = {
      data: [],
      users: []
    };
  }
  static propTypes = {
    micro: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
  };
  componentDidMount() {
    const { selectedMicro } = this.props.micro;
    const id = selectedMicro;
    const element = this.props.element;
    const body = JSON.stringify({ id, element });
    const config = {
      headers: {
        "Content-type": "application/json"
      }
    };

    axios
      .post("/api/connect/ElementEvents", body, config)
      .then(response => {
        this.setState({ data: response.data });
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get("/api/users/all")
      .then(response => {
        this.setState({ users: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }
  componentWillReceiveProps() {
    const { selectedMicro } = this.props.micro;
    const id = selectedMicro;
    const element = this.props.element;
    const body = JSON.stringify({ id, element });
    const config = {
      headers: {
        "Content-type": "application/json"
      }
    };
    axios
      .post("/api/connect/ElementEvents", body, config)
      .then(response => {
        this.setState({ data: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  logsList() {
    return this.state.data.map(currentRecord => {
      const register_date = currentRecord.register_date.split("T");
      const date = register_date[0];
      var hour = register_date[1];
      hour = hour.substring(0, 5);
      const dateAndHour = date + " " + hour;

      return (
        <div className="col-sm-12">
          <div className="card mb-2">
            <div className="card-body">
              <p
                style={{
                  fontFamily: "nunito",
                  fontSize: 15,
                  fontWeight: "bold",
                  color: "#8F8F91"
                }}
              >
                {" "}
                {dateAndHour}{" "}
              </p>
              <ul>
                <li>
                  <span
                    style={{
                      fontFamily: "nunito",
                      fontWeight: "bold"
                    }}
                  >
                    Name of User:
                  </span>{" "}
                  <span style={{ fontFamily: "nunito" }}>
                    {" "}
                    {currentRecord.user_name}
                  </span>{" "}
                </li>
                <li>
                  <span
                    style={{
                      fontFamily: "nunito",
                      fontWeight: "bold"
                    }}
                  >
                    Email of User:
                  </span>{" "}
                  <span style={{ fontFamily: "nunito" }}>
                    {currentRecord.user_email}
                  </span>{" "}
                </li>
                <li>
                  <span
                    style={{
                      fontFamily: "nunito",
                      fontWeight: "bold"
                    }}
                  >
                    New Value:
                  </span>{" "}
                  <span style={{ fontFamily: "nunito" }}>
                    {currentRecord.event.value}
                  </span>{" "}
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    });
  }
  render() {
    const styles = StyleSheet.create({
      recordDiv: {
        maxWidth: "1000px",
        maxHeight: "100vh",
        overflowY: "scroll",
        paddingRight: 20
      }
    });

    return (
      <div>
        <div className={css(styles.recordDiv)}>
          <div className="row">{this.logsList()}</div>
        </div>
        <br />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  micro: state.micro
});

export default connect(mapStateToProps)(Logs);
