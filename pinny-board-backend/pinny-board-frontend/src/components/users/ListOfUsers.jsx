import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite/no-important";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import { selectUser, clearUser } from "../../actions/authActions";

export function Users(props) {
  return (
    <div>
      <h5 class="card-title">{props.users.name}</h5>
      <p class="card-text">{props.users.email}</p>
      <p class="card-text">microsere {props.users.microsere[1]}</p>
      <br />
    </div>
  );
}

class ListOfUsers extends Component {
  constructor(props) {
    super(props);

    this.state = { users: [] };
  }

  static propTypes = {
    auth: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired,
    clearUser: PropTypes.func.isRequired,
    selectUser: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.clearUser();
    axios
      .get("/api/users/all")
      .then(response => {
        this.setState({ users: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  select(e) {
    this.props.selectUser(e.target.name);
  }

  delete(e) {
    const { selectedUser } = this.props.auth;
    const id = selectedUser;
    axios.delete("/api/users/" + id).then(response => {
      console.log(response.data);
    });

    this.setState({
      users: this.state.users.filter(el => el._id !== selectedUser)
    });
  }

  usersList() {
    return this.state.users.map(currentUser => {
      return (
        <div className="col-sm-6">
          <div className="card mb-4">
            <div className="card-body">
              <Users users={currentUser} key={currentUser._id} />

              <div>
                <a
                  href="/home/users/edit"
                  name={currentUser._id}
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
                  name={currentUser._id}
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
                          Delete User
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
                          name={currentUser._id}
                          onClick={e => this.delete(e)}
                        >
                          Yes{"  "}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
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

    return (
      <div className={css(styles.userDiv)}>
        <h1 class="display-4">Users</h1>
        <div className="row">{this.usersList()}</div>
        <a href="/home/users/new" className="btn btn-outline-success">
          Add New User
        </a>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error
});
export default connect(mapStateToProps, { selectUser, clearUser })(ListOfUsers);
