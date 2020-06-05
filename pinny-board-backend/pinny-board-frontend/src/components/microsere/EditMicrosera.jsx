import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { clearAll, editMicrosera } from "../../actions/microActions";
import { clearErrors } from "../../actions/errorActions";
import { Alert } from "reactstrap";
import { StyleSheet, css } from "aphrodite/no-important";
import { Dropdown, Form, Divider } from "semantic-ui-react";
import _ from "lodash";
import axios from "axios";

class EditMicrosera extends Component {
  state = {
    id: "",
    code: "",
    client_id: "",
    type: "",
    levels: Number,
    modules: Number,
    electrovalves: Number,
    leds: Number,
    fans: Number,
    heating: false,
    country: "",
    city: "",
    street: "",
    number: "",
    facility: "",
    longitude: Number,
    latitude: Number,
    msg: null
  };

  static propTypes = {
    isMicroEdited: PropTypes.bool,
    micro: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired,
    editMicrosera: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { selectedMicro } = this.props.micro;
    const microId = selectedMicro;
    this.setState({ id: microId });
    axios
      .get("/api/microsere/" + microId)
      .then(response => {
        this.setState({
          code: response.data.code,
          client_id: response.data.client_id,
          type: response.data.type,
          levels: response.data.levels,
          modules: response.data.modules,
          electrovalves: response.data.electrovalves,
          leds: response.data.leds,
          fans: response.data.fans,
          heating: response.data.heating,
          country: response.data.address.country,
          city: response.data.address.city,
          street: response.data.address.street,
          number: response.data.address.number,
          facility: response.data.address.facility,
          longitude: response.data.address.longitude,
          latitude: response.data.address.latitude
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      //Check for register error
      if (error.id === "MADDED_FAIL") {
        this.setState({ msg: error.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => {
    const {
      id,
      code,
      client_id,
      type,
      levels,
      modules,
      electrovalves,
      leds,
      fans,
      heating,
      country,
      city,
      street,
      number,
      facility,
      longitude,
      latitude
    } = this.state;

    //Create user object
    const newMicrosera = {
      id,
      code,
      client_id,
      type,
      levels,
      modules,
      electrovalves,
      leds,
      fans,
      heating,
      country,
      city,
      street,
      number,
      facility,
      longitude,
      latitude
    };

    this.props.editMicrosera(newMicrosera);
  };

  toggle = () => this.setState(prevState => ({ heating: !prevState.heating }));

  renderRedirect = () => {
    const { isMicroEdited } = this.props.micro;
    if (isMicroEdited === true) {
      console.log("Succes!");
      return <Redirect to="/home" />;
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
    const {
      code,
      client_id,
      type,
      levels,
      modules,
      electrovalves,
      leds,
      fans,
      country,
      city,
      street,
      number,
      facility,
      longitude,
      latitude
    } = this.state;
    const typeDefinitions = ["One", "Plus"];
    const typeOptions = _.map(typeDefinitions, type => ({
      key: type,
      text: type,
      value: type
    }));
    //#########COMPONENT##########//
    return (
      <div className={css(styles.formDivStyle)}>
        <h1 class="display-4">Edit Microsera</h1>

        <Divider />
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Input
              required
              placeholder="Code"
              name="code"
              label="Code"
              value={code}
              onChange={this.handleChange}
            />

            <Form.Input
              required
              placeholder="Client ID"
              name="client_id"
              label="Client ID"
              value={client_id}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Divider horizontal>
            <p style={{ color: "#D7DAD8" }}>Hardware Details</p>
          </Divider>
          <Dropdown
            required
            placeholder="Type"
            search
            selection
            name="type"
            label="Type"
            options={typeOptions}
            value={type}
            onChange={this.handleChange}
          />
          <br />
          {type === "" ? null : type === "One" ? (
            <div>
              <br />
              <Form.Group>
                <Form.Input
                  required
                  type="number"
                  placeholder="Number of Levels"
                  name="levels"
                  label="Number of Levels"
                  value={levels}
                  onChange={this.handleChange}
                />

                <Form.Input
                  type="number"
                  placeholder="Number of Fans"
                  name="fans"
                  label="Number of Fans"
                  value={fans}
                  onChange={this.handleChange}
                />

                <Form.Input
                  type="number"
                  placeholder="Number of Leds"
                  name="leds"
                  label="Number of Leds"
                  value={leds}
                  onChange={this.handleChange}
                />
              </Form.Group>
            </div>
          ) : (
            <div>
              <br />
              <Form.Group>
                <Form.Input
                  type="number"
                  placeholder="Number of Levels"
                  name="levels"
                  label="Number of Levels"
                  value={levels}
                  onChange={this.handleChange}
                />

                <Form.Input
                  required
                  type="number"
                  placeholder="Number of Modules"
                  name="modules"
                  label="Number of Modules"
                  value={modules}
                  onChange={this.handleChange}
                />

                <Form.Input
                  required
                  type="number"
                  placeholder="Number of Electrovalves"
                  name="electrovalves"
                  label="Number of Electrovalves"
                  value={electrovalves}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Checkbox
                label="Heating System"
                checked={this.state.heating}
                onChange={this.toggle}
              />
            </div>
          )}
          <br />
          <Divider horizontal>
            <p style={{ color: "#D7DAD8" }}>Location</p>
          </Divider>
          <Form.Group>
            <Form.Input
              placeholder="Country"
              name="country"
              label="Country"
              value={country}
              onChange={this.handleChange}
            />

            <Form.Input
              required
              placeholder="City"
              name="city"
              label="City"
              value={city}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Input
              required
              placeholder="Street"
              name="street"
              label="Street"
              value={street}
              onChange={this.handleChange}
            />
            <Form.Input
              required
              placeholder="Number"
              name="number"
              label="Number"
              value={number}
              onChange={this.handleChange}
            />
            <Form.Input
              required
              placeholder="Facility"
              name="facility"
              label="Facility"
              value={facility}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              required
              type="number"
              placeholder="Latitude"
              name="latitude"
              label="Latitude"
              value={latitude}
              onChange={this.handleChange}
            />
            <Form.Input
              required
              type="number"
              placeholder="Longitude"
              name="longitude"
              label="Longitude"
              value={longitude}
              onChange={this.handleChange}
            />
          </Form.Group>
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
  micro: state.micro,
  error: state.error
});

export default connect(mapStateToProps, {
  editMicrosera,
  clearErrors,
  clearAll
})(EditMicrosera);
