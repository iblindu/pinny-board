import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import _ from "lodash";
import { Dropdown } from "semantic-ui-react";

class GenerateGraphs extends Component {
  constructor() {
    super();
    this.state = { plants: [], species: "" };
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
    if (report !== prevProps.report)
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
  render() {
    const { species } = this.state.species;
    const speciesDefinitions = this.state.plants;
    const speciesOptions = _.map(speciesDefinitions, species => ({
      key: species,
      text: species,
      value: species
    }));
    return (
      <div>
        <p>
          <Dropdown
            required
            placeholder="Plant Species"
            search
            selection
            name="species"
            options={speciesOptions}
            value={species}
            onChange={this.handleChange}
          />
        </p>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  micro: state.micro,
  auth: state.auth
});

export default connect(mapStateToProps)(GenerateGraphs);
