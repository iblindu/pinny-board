import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite/no-important";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { selectMicrosera, clearAll } from "../../actions/microActions";
import IconArrow from "../../assets/icon-arrow";
import Switch from "react-switch";

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

    this.state = { microsere: [] };
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
    const { selectedMicro } = this.props.micro;
    const id = selectedMicro;
    axios.delete("/api/microsere/" + id).then(response => {
      console.log(response.data);
    });

    this.setState({
      microsere: this.state.microsere.filter(el => el._id !== selectedMicro)
    });
  }

  microsereList() {
    const { user } = this.props.auth;
    return this.state.microsere.map(currentMicro => {
      if (user.role === "administrator" || user.role === "technical")
        return (
          <div className="col-sm-6">
            <div className="card mb-4">
              <div className="card-body">
                <Microsere microsere={currentMicro} key={currentMicro._id} />

                <a
                  href="/dashboard"
                  name={currentMicro._id}
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
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm"
                      data-toggle="modal"
                      data-target="#exampleModal"
                      name={currentMicro._id}
                      onClick={e => this.select(e)}
                    >
                      Delete
                    </button>
                    <div
                      className="modal fade"
                      id="exampleModal"
                      tabindex="-1"
                      role="dialog"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                              Delete Microsera
                            </h5>
                            <button
                              type="button"
                              className="close"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <p>Are you sure you want to delete it?</p>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-danger"
                              data-dismiss="modal"
                            >
                              No
                            </button>

                            <a
                              className="btn btn-success"
                              data-dismiss="modal"
                              name={currentMicro._id}
                              onClick={e => this.delete(e)}
                            >
                              Yes{"  "}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        );
      else {
        for (var i in user.microsere) {
          var item = user.microsere[i];
          if (currentMicro.code === item)
            return (
              <div className="col-sm-6">
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
        <h1 className="display-4">Microsere</h1>
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
