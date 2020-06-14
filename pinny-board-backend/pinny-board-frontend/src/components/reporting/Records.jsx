import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import { StyleSheet, css } from "aphrodite/no-important";

class Records extends Component {
  constructor() {
    super();

    this.state = {
      data: [],
      report: ""
    };
  }
  static propTypes = {
    micro: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
  };
  componentDidMount() {
    const { selectedMicro } = this.props.micro;
    const id = selectedMicro;
    const species = this.props.species;
    const body = JSON.stringify({ id, species });
    const config = {
      headers: {
        "Content-type": "application/json"
      }
    };

    if (this.props.report === "sales") {
      axios
        .post("/api/reporting/PlantSales", body, config)
        .then(response => {
          this.setState({ data: response.data, report: "sales" });
        })
        .catch(error => {
          console.log(error);
        });
    } else if (this.props.report === "production") {
      axios
        .post("/api/reporting/PlantProduction", body, config)
        .then(response => {
          this.setState({ data: response.data, report: "production" });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
  componentWillReceiveProps(nextProps) {
    const { selectedMicro } = this.props.micro;
    const id = selectedMicro;
    const species = nextProps.species;
    const body = JSON.stringify({ id, species });
    const config = {
      headers: {
        "Content-type": "application/json"
      }
    };
    const report = nextProps.report;
    if (report === "sales") {
      axios
        .post("/api/reporting/PlantSales", body, config)
        .then(response => {
          this.setState({ data: response.data, report: "sales" });
        })
        .catch(error => {
          console.log(error);
        });
    } else if (report === "production") {
      axios
        .post("/api/reporting/PlantProduction", body, config)
        .then(response => {
          this.setState({ data: response.data, report: "production" });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  recordsList() {
    return this.state.data.map(currentRecord => {
      const register_date = currentRecord.register_date.split("T");
      const date = register_date[0];
      var hour = register_date[1];
      hour = hour.substring(0, 5);
      const dateAndHour = date + " " + hour;

      return this.state.report === "sales" ? (
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
                      fontWeight: "bold",
                      color: "#5FB75F"
                    }}
                  >
                    Stock:
                  </span>{" "}
                  <span style={{ fontFamily: "nunito" }}>
                    {currentRecord.initial +
                      currentRecord.added -
                      currentRecord.loses}
                  </span>{" "}
                </li>
                <li>
                  <span
                    style={{
                      fontFamily: "nunito",
                      fontWeight: "bold",
                      color: "#FD9E48"
                    }}
                  >
                    Initial Number on Shelf:
                  </span>{" "}
                  <span style={{ fontFamily: "nunito" }}>
                    {currentRecord.initial}
                  </span>{" "}
                </li>
                <li>
                  {" "}
                  <span
                    style={{
                      fontFamily: "nunito",
                      fontWeight: "bold",
                      color: "#DF5C5C"
                    }}
                  >
                    Losese on Shelf:
                  </span>{" "}
                  <span style={{ fontFamily: "nunito" }}>
                    {currentRecord.loses}
                  </span>
                </li>
                <li>
                  <span
                    style={{
                      fontFamily: "nunito",
                      fontWeight: "bold",
                      color: "#5598C5"
                    }}
                  >
                    Number of Plants Added from Microsera:
                  </span>{" "}
                  <span style={{ fontFamily: "nunito" }}>
                    {currentRecord.added}
                  </span>
                </li>
              </ul>
              <p>
                <span
                  style={{
                    fontFamily: "nunito",
                    fontWeight: "bold",
                    color: "#8F8F91"
                  }}
                >
                  Added by:
                </span>{" "}
                <span style={{ fontFamily: "nunito", color: "#8F8F91" }}>
                  {currentRecord.user_name + " - " + currentRecord.user_email}
                </span>{" "}
              </p>
            </div>
          </div>
        </div>
      ) : (
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
                {date}{" "}
              </p>

              <ul>
                <li>
                  <span
                    style={{
                      fontFamily: "nunito",
                      fontWeight: "bold",
                      color: "#5FB75F"
                    }}
                  >
                    Stock:
                  </span>{" "}
                  <span style={{ fontFamily: "nunito" }}>
                    {currentRecord.initial +
                      currentRecord.added -
                      currentRecord.loses}
                  </span>{" "}
                </li>
                <li>
                  <span
                    style={{
                      fontFamily: "nunito",
                      fontWeight: "bold",
                      color: "#FD9E48"
                    }}
                  >
                    Initial Number In Microsera:
                  </span>{" "}
                  <span style={{ fontFamily: "nunito" }}>
                    {currentRecord.initial}
                  </span>{" "}
                </li>
                <li>
                  {" "}
                  <span
                    style={{
                      fontFamily: "nunito",
                      fontWeight: "bold",
                      color: "#DF5C5C"
                    }}
                  >
                    Losese in Microsera:
                  </span>{" "}
                  <span style={{ fontFamily: "nunito" }}>
                    {currentRecord.loses}
                  </span>
                </li>
                <li>
                  <span
                    style={{
                      fontFamily: "nunito",
                      fontWeight: "bold",
                      color: "#5598C5"
                    }}
                  >
                    Number of Plants Added in Microsera:
                  </span>{" "}
                  <span style={{ fontFamily: "nunito" }}>
                    {currentRecord.added}
                  </span>
                </li>
              </ul>
              <p>
                <span
                  style={{
                    fontFamily: "nunito",
                    fontWeight: "bold",
                    color: "#8F8F91"
                  }}
                >
                  Added by:
                </span>{" "}
                <span style={{ fontFamily: "nunito", color: "#8F8F91" }}>
                  {currentRecord.user_name + " - " + currentRecord.user_email}
                </span>{" "}
              </p>
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
    const { user } = this.props.auth;

    return (
      <div>
        <div className={css(styles.recordDiv)}>
          <div className="row">{this.recordsList()}</div>
        </div>
        <br />
        {user.role === "administrator" || user.role === "gardner" ? (
          <a href="/dashboard/reporting" className="btn btn-outline-success">
            Add New Record
          </a>
        ) : null}{" "}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  micro: state.micro
});

export default connect(mapStateToProps)(Records);
