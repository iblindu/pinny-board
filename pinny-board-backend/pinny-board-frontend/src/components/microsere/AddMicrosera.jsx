import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addMicrosera } from "../../actions/microActions";
import { clearErrors } from "../../actions/errorActions";
import { Alert } from "reactstrap";
import { StyleSheet, css } from "aphrodite/no-important";
import { Dropdown, Form, Divider } from "semantic-ui-react";
import _ from "lodash";

class AddMicrosera extends Component {
  state = {
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
    isMicroAdded: PropTypes.bool,
    error: PropTypes.object.isRequired,
    addMicrosera: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      //Check for register error
      if (error.id === "MADDED_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => {
    const { code, type, city, street, number, facility } = this.state;

    //Create user object
    const newMicrosera = {
      code,
      type,
      city,
      street,
      number,
      facility
    };

    //Atempt to add Micosera
    this.props.addMicrosera(newMicrosera);
  };
  toggle = () => this.setState(prevState => ({ heating: !prevState.heating }));
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
        <h1 class="display-4">Add New Microsera</h1>

        <Divider />
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Input
              placeholder="Code"
              name="code"
              value={code}
              onChange={this.handleChange}
            />

            <Form.Input
              placeholder="Client ID"
              name="client_id"
              value={client_id}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Divider horizontal>
            <p style={{ color: "#D7DAD8" }}>Hardware Details</p>
          </Divider>
          <Dropdown
            placeholder="Type"
            search
            selection
            name="type"
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
                  placeholder="Number of Levels"
                  name="levels"
                  value={levels}
                  onChange={this.handleChange}
                />

                <Form.Input
                  placeholder="Number of Fans"
                  name="fans"
                  value={fans}
                  onChange={this.handleChange}
                />

                <Form.Input
                  placeholder="Number of Leds"
                  name="leds"
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
                  placeholder="Number of Levels"
                  name="levels"
                  value={levels}
                  onChange={this.handleChange}
                />

                <Form.Input
                  placeholder="Number of Modules"
                  name="modules"
                  value={modules}
                  onChange={this.handleChange}
                />

                <Form.Input
                  placeholder="Number of Electrovalves"
                  name="electrovalves"
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
              value={country}
              onChange={this.handleChange}
            />

            <Form.Input
              placeholder="City"
              name="city"
              value={city}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Input
              placeholder="Street"
              name="street"
              value={street}
              onChange={this.handleChange}
            />
            <Form.Input
              placeholder="Number"
              name="number"
              value={number}
              onChange={this.handleChange}
            />
            <Form.Input
              placeholder="Facility"
              name="facility"
              value={facility}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              placeholder="Latitude"
              name="latitude"
              value={latitude}
              onChange={this.handleChange}
            />
            <Form.Input
              placeholder="Longitude"
              name="longitude"
              value={longitude}
              onChange={this.handleChange}
            />
          </Form.Group>
          <br />
          <Form.Button content="Add" />
        </Form>

        {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isMicroAdded: state.micro.isMicroAdded,
  error: state.error
});

export default connect(mapStateToProps, { addMicrosera, clearErrors })(
  AddMicrosera
);
