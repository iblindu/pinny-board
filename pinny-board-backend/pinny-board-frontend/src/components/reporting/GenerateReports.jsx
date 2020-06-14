import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import _ from "lodash";
import { Dropdown, Divider } from "semantic-ui-react";
import Graphs from "./Graphs";
import Records from "./Records";
class GenerateReports extends Component {
  constructor() {
    super();
    this.state = {
      plants: [],
      graphsSpecies: "",
      recordsSpecies: "",
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
    const body = JSON.stringify({ id });
    const config = {
      headers: {
        "Content-type": "application/json"
      }
    };
    this.setState({ report: this.props.report });
    if (this.props.report === "sales") {
      axios
        .post("/api/reporting/allPlantsSales", body, config)
        .then(response => {
          this.setState({ plants: response.data });
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      axios
        .post("/api/reporting/allPlantsProduction", body, config)
        .then(response => {
          this.setState({ plants: response.data });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
  componentDidUpdate(prevProps) {
    const { selectedMicro } = this.props.micro;
    const id = selectedMicro;
    const body = JSON.stringify({ id });
    const config = {
      headers: {
        "Content-type": "application/json"
      }
    };
    const { report } = this.props;
    if (report !== prevProps.report) {
      this.setState({ report: this.props.report });
      if (this.props.report === "sales") {
        axios
          .post("/api/reporting/allPlantsSales", body, config)
          .then(response => {
            this.setState({ plants: response.data });
          })
          .catch(error => {
            console.log(error);
          });
      } else if (this.props.report === "production") {
        axios
          .post("/api/reporting/allPlantsProduction", body, config)
          .then(response => {
            this.setState({ plants: response.data });
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }
  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  render() {
    const { graphsSpecies, recordsSpecies, report } = this.state;
    const speciesDefinitions = this.state.plants;
    const speciesOptions = _.map(speciesDefinitions, species => ({
      key: species,
      text: species,
      value: species
    }));

    return (
      <div>
        <p style={{ fontFamily: "nunito", fontSize: 30, fontWeight: "light" }}>
          Graphs
        </p>

        <Dropdown
          required
          placeholder="Plant Species"
          search
          selection
          name="graphsSpecies"
          options={speciesOptions}
          value={graphsSpecies}
          onChange={this.handleChange}
        />
        <br />
        <br />
        {graphsSpecies ? (
          <Graphs species={graphsSpecies} report={report} />
        ) : null}
        <Divider style={{ width: "70vw" }} />

        <p style={{ fontFamily: "nunito", fontSize: 30, fontWeight: "light" }}>
          Records
        </p>
        <Dropdown
          required
          placeholder="Plant Species"
          search
          selection
          name="recordsSpecies"
          options={speciesOptions}
          value={recordsSpecies}
          onChange={this.handleChange}
        />
        <br />
        <br />
        {recordsSpecies ? (
          <Records species={recordsSpecies} report={report} />
        ) : null}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  micro: state.micro,
  auth: state.auth
});

export default connect(mapStateToProps)(GenerateReports);
