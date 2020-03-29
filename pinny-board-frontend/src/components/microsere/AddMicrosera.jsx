import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addMicrosera } from "../../actions/microActions";
import { clearErrors } from "../../actions/errorActions";
import { Alert } from "reactstrap";
import { StyleSheet, css } from "aphrodite/no-important";
import axios from "axios";
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

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
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
  }

  render() {
    //##########STYLE############//
    const styles = StyleSheet.create({
      formDivStyle: {
        margin: "auto",
        padding: 30
      },
      title: {
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: 24,
        color: "#7c7c7d",
        lineHeight: "30px",
        letterSpacing: 0.3,
        "@media (max-width: 768px)": {
          marginLeft: 36
        },
        "@media (max-width: 468px)": {
          fontSize: 20
        }
      }
    });

    //#########COMPONENT##########//
    return (
      <div>
        <div className={css(styles.formDivStyle)}>
          <div className="col-md-auto">
            <div className={css(styles.title)}> Add New Microsera </div>

            <form name="form" onSubmit={e => this.onSubmit(e)}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="code"
                  placeholder="code"
                  id="code"
                  value={this.state.code}
                  onChange={e => this.onChange(e)}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="type"
                  placeholder="type"
                  id="type"
                  value={this.state.type}
                  onChange={e => this.onChange(e)}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="city"
                  placeholder="city"
                  id="city"
                  value={this.state.city}
                  onChange={e => this.onChange(e)}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="street"
                  placeholder="street"
                  id="street"
                  value={this.state.street}
                  onChange={e => this.onChange(e)}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="number"
                  placeholder="number"
                  id="number"
                  value={this.state.number}
                  onChange={e => this.onChange(e)}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="facility"
                  placeholder="facility"
                  id="facility"
                  value={this.state.facility}
                  onChange={e => this.onChange(e)}
                />
              </div>
              <div className="form-group">
                <input
                  type="submit"
                  value="Add"
                  className="btn btn-outline-success"
                />
              </div>
            </form>
            {this.state.msg ? (
              <Alert color="danger">{this.state.msg}</Alert>
            ) : null}
          </div>
        </div>
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
