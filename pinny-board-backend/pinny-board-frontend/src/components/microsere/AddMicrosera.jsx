import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addMicrosera } from "../../actions/microActions";
import { clearErrors } from "../../actions/errorActions";
import { Alert } from "reactstrap";
import { StyleSheet, css } from "aphrodite/no-important";
import { Form } from "semantic-ui-react";

class AddMicrosera extends Component {
  state = {
    code: "",
    type: "",
    city: "",
    street: "",
    number: "",
    facility: "",
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

  render() {
    //##########STYLE############//
    const styles = StyleSheet.create({
      formDivStyle: {
        margin: "auto",
        padding: 30,
        maxWidth: "800px"
      }
    });
    const { code, type, city, street, number, facility } = this.state;
    //#########COMPONENT##########//
    return (
      <div className={css(styles.formDivStyle)}>
        <h1 class="display-4">Add New Microsera</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            placeholder="Code"
            name="code"
            value={code}
            onChange={this.handleChange}
          />
          <Form.Input
            placeholder="Type"
            name="type"
            value={type}
            onChange={this.handleChange}
          />
          <Form.Input
            placeholder="City"
            name="city"
            value={city}
            onChange={this.handleChange}
          />
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
