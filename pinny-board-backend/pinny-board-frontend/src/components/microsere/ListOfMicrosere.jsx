import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite/no-important";
import axios from "axios";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { selectMicrosera } from "../../actions/microActions";
import { clearAll } from "../../actions/microActions";
import IconArrow from "../../assets/icon-arrow";
import { Header, Modal, Button, Icon } from "semantic-ui-react";
export function Microsere(props) {
  return (
    <div>
      <h5 className="card-title">
        {props.microsere.address.facility} {"  "} {props.microsere.type}
      </h5>
      <p className="card-text">
        {props.microsere.address.street}, {props.microsere.address.number},{" "}
        {props.microsere.address.city}{" "}
      </p>
      <br />
    </div>
  );
}

class ListOfMicrosere extends Component {
  constructor(props) {
    super(props);

    // this.deleteUsers = this.deleteUsers.bind(this);

    this.state = { microsere: [], open: false };
  }

  static propTypes = {
    auth: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired,
    micro: PropTypes.object.isRequired,
    clearAll: PropTypes.func.isRequired,
    selectMicrosera: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.clearAll();
    axios
      .get("/api/microsere/all")
      .then(response => {
        this.setState({ microsere: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  select(e) {
    this.props.selectMicrosera(e.target.name);
  }

  delete(e) {
    this.close();
    const id = e.target.name;
    axios.delete("/api/microsere/" + id).then(response => {
      console.log(response.data);
    });

    this.setState({
      microsere: this.state.microsere.filter(el => el._id !== id)
    });
  }

  closeConfigShow = closeOnEscape => () => {
    this.setState({ closeOnEscape, open: true });
  };
  close = () => this.setState({ open: false });

  microsereList() {
    const { user } = this.props.auth;
    const { open, closeOnEscape } = this.state;

    return this.state.microsere.map(currentMicro => {
      if (user.role === "administrator" || user.role === "technical")
        return (
          <div class="col-sm-6">
            <div className="card mb-4">
              <div className="card-body">
                <Microsere microsere={currentMicro} key={currentMicro._id} />

                <a
                  href="/dashboard"
                  name={currentMicro.code}
                  className="btn btn-outline-success btn-sm"
                  onClick={e => this.select(e)}
                >
                  Go to dashboard {"  "} <IconArrow />
                </a>

                {user.role === "administrator" ? (
                  <div style={{ float: "right" }}>
                    <a
                      href="/home/edit"
                      name={currentMicro._id}
                      className="btn btn-outline-dark btn-sm"
                      onClick={e => this.select(e)}
                    >
                      Edit{"  "}
                    </a>{" "}
                    | {"  "}
                    <a
                      className="btn btn-outline-danger btn-sm"
                      onClick={this.closeConfigShow(false, true)}
                    >
                      Delete{"  "}
                    </a>
                  </div>
                ) : null}
              </div>
            </div>
            <Modal
              open={open}
              closeOnEscape={closeOnEscape}
              onClose={this.close}
            >
              <Modal.Header>Delete Microsera</Modal.Header>
              <Modal.Content>
                <p>
                  Are you sure you want to delete microsera {currentMicro.code},
                  located in {currentMicro.address.facility} ?
                </p>
              </Modal.Content>
              <Modal.Actions>
                <Button onClick={this.close} negative>
                  No
                </Button>
                <Button
                  name={currentMicro._id}
                  onClick={e => this.delete(e)}
                  positive
                  labelPosition="right"
                  icon="checkmark"
                  content="Yes"
                />
              </Modal.Actions>
            </Modal>
          </div>
        );
      else {
        for (var i in user.microsere) {
          var item = user.microsere[i];
          if (currentMicro.code === item)
            return (
              <div class="col-sm-6">
                <div className="card mb-4">
                  <div className="card-body">
                    <Microsere
                      microsere={currentMicro}
                      key={currentMicro._id}
                    />
                    <a
                      href="/dashboard"
                      name={currentMicro.code}
                      className="btn btn-outline-success btn-sm"
                      onClick={e => this.select(e)}
                    >
                      Go to dashboard {"  "} <IconArrow />
                    </a>
                  </div>
                </div>
              </div>
            );
        }
      }
    });
  }

  render() {
    const styles = StyleSheet.create({
      userDiv: {
        margin: "auto",
        padding: 30,
        maxWidth: "900px"
      }
    });
    const { user } = this.props.auth;
    return (
      <div className={css(styles.userDiv)}>
        <h1 class="display-4">Microsere</h1>
        <div className="row">{this.microsereList()}</div>
        {user.role === "administrator" ? (
          <a href="/home/new" className="btn btn-outline-success">
            Add New Microsera
          </a>
        ) : null}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  micro: state.micro,
  auth: state.auth,
  error: state.error
});

export default connect(mapStateToProps, { selectMicrosera, clearAll })(
  ListOfMicrosere
);
