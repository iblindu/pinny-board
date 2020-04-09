import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite/no-important";
import axios from "axios";

const Users = props => (
  <div class="col-sm-6">
    <div className="card mb-4">
      <div class="card-body">
        <h5 class="card-title">{props.users.name}</h5>
        <p class="card-text">{props.users.email}</p>
        <p class="card-text">microsere {props.users.microsere[1]}</p>
        <a href="#" className="btn btn-outline-dark btn-sm">
          Edit
        </a>
      </div>
    </div>
  </div>
);

class ListOfUsers extends Component {
  constructor(props) {
    super(props);

    // this.deleteUsers = this.deleteUsers.bind(this);

    this.state = { users: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/api/users/all")
      .then(response => {
        this.setState({ users: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  usersList() {
    return this.state.users.map(currentUser => {
      return <Users users={currentUser} key={currentUser._id} />;
    });
  }
  render() {
    const styles = StyleSheet.create({
      userDiv: {
        margin: "auto",
        padding: 30,
        maxWidth: "900px"
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

    return (
      <div className={css(styles.userDiv)}>
        <h1 class="display-4">Users</h1>
        <div className="row">{this.usersList()}</div>
        <a href="/home/users/new" className="btn btn-outline-dark">
          Add New User
        </a>
      </div>
    );
  }
}
export default ListOfUsers;
