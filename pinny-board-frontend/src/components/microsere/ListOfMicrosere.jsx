import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite/no-important";
import axios from "axios";

const Microsere = props => (
  <div>
    <div class="card w-75">
      <div class="card-body">
        <h5 class="card-title">{props.microsere.address.facility}</h5>
        <p class="card-text">
          {props.microsere.address.street}, {props.microsere.address.number},{" "}
          {props.microsere.address.city},{" "}
        </p>
        <p class="card-text">{props.microsere.type}</p>
        <a href="#" className="btn btn-outline-dark btn-sm">
          Edit
        </a>
      </div>
    </div>
    <br />
  </div>
);

class ListOfMicrosere extends Component {
  constructor(props) {
    super(props);

    // this.deleteUsers = this.deleteUsers.bind(this);

    this.state = { microsere: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/api/microsere/all")
      .then(response => {
        this.setState({ microsere: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  microsereList() {
    return this.state.microsere.map(currentMicro => {
      return <Microsere microsere={currentMicro} key={currentMicro._id} />;
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
        <div className={css(styles.title)}> Microsere </div>

        {this.microsereList()}

        <a href="/microsera/new" className="btn btn-outline-dark">
          Add New Microsera
        </a>
      </div>
    );
  }
}
export default ListOfMicrosere;
