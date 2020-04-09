import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite/no-important";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { selectMicrosera } from "../../actions/microActions";
import IconArrow from "../../assets/icon-arrow";

export function Microsere(props) {
  return (
    <div>
      <h5 className="card-title">{props.microsere.address.facility}</h5>
      <p className="card-text">
        {props.microsere.address.street}, {props.microsere.address.number},{" "}
        {props.microsere.address.city},{" "}
      </p>
      <p className="card-text">{props.microsere.type}</p>
    </div>
  );
}

class ListOfMicrosere extends Component {
  constructor(props) {
    super(props);

    // this.deleteUsers = this.deleteUsers.bind(this);

    this.state = { microsere: [] };
  }

  static propTypes = {
    selectedMicrosera: PropTypes.bool,
    auth: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired,
    selectMicrosera: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

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

  select(e) {
    this.props.selectMicrosera(e.target.name);
  }
  microsereList() {
    const { user } = this.props.auth;
    return this.state.microsere.map(currentMicro => {
      if (user.role === "administrator" || user.role === "technical")
        return (
          <div class="col-sm-6">
            <div className="card mb-4">
              <div className="card-body">
                <Microsere microsere={currentMicro} key={currentMicro._id} />
                {user.role === "administrator" ? (
                  <a href="#" className="btn btn-outline-dark btn-sm">
                    Edit
                  </a>
                ) : null}

                {"   "}
                <a
                  href="/microsera"
                  name={currentMicro.code}
                  className="btn btn-outline-dark btn-sm"
                  onClick={e => this.select(e)}
                >
                  Go to dashboard {"  "} <IconArrow />
                </a>
              </div>
            </div>
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
                    <a href="#" className="btn btn-outline-dark btn-sm">
                      Edit
                    </a>
                    {"   "}
                    <a
                      href="/microsera"
                      name={currentMicro.code}
                      className="btn btn-outline-dark btn-sm"
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
          <a href="/home/new" className="btn btn-outline-dark">
            Add New Microsera
          </a>
        ) : null}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  selectedMicrosera: state.micro.selectedMicrosera,
  auth: state.auth,
  error: state.error
});

export default connect(mapStateToProps, { selectMicrosera })(ListOfMicrosere);
