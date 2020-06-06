import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  addSalesReport,
  addProductionReport
} from "../../actions/reportActions";
import { clearErrors } from "../../actions/errorActions";
import { Alert } from "reactstrap";
import { StyleSheet, css } from "aphrodite/no-important";
import { Dropdown, Form, Divider, Button } from "semantic-ui-react";
import _ from "lodash";

class AddReport extends Component {
  state = {
    user_id: "",
    micro_code: "",
    plants: [],
    species: "",
    initial: Number,
    loses: Number,
    added: Number,
    type: "sales",
    msg: null
  };

  static propTypes = {
    isReportAdded: PropTypes.bool,
    error: PropTypes.object.isRequired,
    addSalesReport: PropTypes.func.isRequired,
    addProductionReport: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  componentDidMount() {
    axios.get("/api/reporting/allPlants").then(response => {
      if (response.data.length > 0) {
        this.setState({
          plants: response.data.map(plant => plant.name)
        });
      }
    });
  }
  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      //Check for register error
      if (error.id === "RADDED_FAIL") {
        this.setState({ msg: error.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => {
    const {
      user_id,
      micro_code,
      species,
      initial,
      loses,
      added,
      type
    } = this.state;

    //Create user object
    const newReport = {
      user_id,
      micro_code,
      species,
      initial,
      loses,
      added
    };

    //Atempt to add Micosera
    if (this.state.type === "sales") {
      this.props.addSalesReport(newReport);
    } else {
      this.props.addProductionReport(newReport);
    }

    this.setState({
      user_id: "",
      micro_code: "",
      species: [],
      initial: Number,
      loses: Number,
      added: Number,
      msg: null
    });
  };

  handleSales = () => {
    this.setState({ type: "sales" });
  };
  handleProduction = () => {
    this.setState({ type: "production" });
  };

  renderRedirect = () => {
    const { isReportAdded } = this.props;
    if (isReportAdded === true) {
      console.log("Succes!");
      window.location.reload(false);
    }
  };
  render() {
    //##########STYLE############//
    const styles = StyleSheet.create({
      formDivStyle: {
        margin: "auto",
        padding: 30,
        maxWidth: "800px"
      }
    });
    const { species, initial, loses, added, type } = this.state;
    const speciesDefinitions = this.state.plants;
    const speciesOptions = _.map(speciesDefinitions, species => ({
      key: species,
      text: species,
      value: species
    }));
    //#########COMPONENT##########//
    return (
      <div className={css(styles.formDivStyle)}>
        <h1 class="display-4">Add New Report</h1>
        <Button.Group>
          <Button onClick={this.handleSales}>Sales</Button>
          <Button.Or />
          <Button onClick={this.handleProduction}>Production</Button>
        </Button.Group>
        <Divider />
        <Form onSubmit={this.handleSubmit}>
          <Dropdown
            required
            placeholder="Plant Species"
            search
            selection
            name="species"
            label="species"
            options={speciesOptions}
            value={species}
            onChange={this.handleChange}
          />
          <br />
          {type === "sales" ? (
            <div>
              <br />

              <Form.Input
                required
                type="number"
                placeholder="Number of Plants on Shelf"
                name="initial"
                label="Number of Plants on Shelf"
                value={initial}
                onChange={this.handleChange}
              />

              <Form.Input
                required
                type="number"
                placeholder="Number of Plants Lost"
                name="loses"
                label="Number of Plants Lost"
                value={loses}
                onChange={this.handleChange}
              />
              <Form.Input
                required
                type="number"
                placeholder="Number of Plants on Added from Microsera"
                name="added"
                label="Number of Plants on Added from Microsera"
                value={added}
                onChange={this.handleChange}
              />
            </div>
          ) : (
            <div>
              <br />

              <Form.Input
                required
                type="number"
                placeholder="Number of Plants in Microsera"
                name="initial"
                label="Number of Plants in Microsera"
                value={initial}
                onChange={this.handleChange}
              />

              <Form.Input
                required
                type="number"
                placeholder="Number of Plants Lost"
                name="loses"
                label="Number of Plants Lost"
                value={loses}
                onChange={this.handleChange}
              />
              <Form.Input
                required
                type="number"
                placeholder="Number of Plants on Added "
                name="added"
                label="Number of Plants on Added "
                value={added}
                onChange={this.handleChange}
              />
            </div>
          )}

          <br />
          {this.state.msg ? (
            <Alert color="danger">{this.state.msg}</Alert>
          ) : null}
          <Form.Button content="Add" />
        </Form>
        {this.renderRedirect()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  report: state.report,
  error: state.error
});

export default connect(mapStateToProps, {
  addSalesReport,
  addProductionReport,
  clearErrors
})(AddReport);
