import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite/no-important";
import axios from "axios";
import { connect } from "react-redux";
import { selectPlant, addPlant, clearAll } from "../../actions/reportActions";
import PropTypes from "prop-types";
import { Alert } from "reactstrap";
import { Form, Divider } from "semantic-ui-react";

export function Plant(props) {
  return props.plants.name;
}

class Plants extends Component {
  constructor(props) {
    super(props);

    this.state = {
      plants: [],
      addPlant: false,
      name: "",
      error: null,
      success: null
    };

    this.handleClick = this.handleClick.bind(this);
  }

  static propTypes = {
    error: PropTypes.object.isRequired,
    addPlant: PropTypes.func.isRequired,
    isPlantAdded: PropTypes.func.isRequired,
    clearAll: PropTypes.func.isRequired,
    selectPlant: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.clearAll();

    axios
      .get("/api/reporting/allPlants")
      .then(response => {
        this.setState({ plants: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      //Check for register error
      if (error.id === "PADDED_FAIL") {
        this.setState({ error: error.msg });
      } else {
        this.setState({ error: null });
      }
    }
  }

  select(e) {
    this.props.selectPlant(e.target.name);
  }

  delete(e) {
    const { selectedPlant } = this.props.report;
    const id = selectedPlant;
    axios.delete("/api/reporting/" + id).then(response => {
      console.log(response.data);
    });

    this.setState({
      plants: this.state.plants.filter(el => el._id !== selectedPlant)
    });

    window.location.reload(false);
  }

  handleClick(e) {
    this.setState({ addPlant: true });
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => {
    const { name } = this.state;
    const newPlant = {
      name
    };
    this.props.addPlant(newPlant);
  };

  renderRedirect = () => {
    const { isPlantAdded } = this.props.report;

    if (isPlantAdded === true) {
      this.setState({ addPlant: false, success: "Plant Added!" });
      window.location.reload(false);
    }
  };
  plantList() {
    return this.state.plants.map(currentPlant => {
      return (
        <div className="col-sm-12">
          <div className="card mb-2">
            <div className="card-body">
              <Plant plants={currentPlant} key={currentPlant._id} />
              <div className="float-right">
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm"
                  data-toggle="modal"
                  data-target="#exampleModal"
                  name={currentPlant._id}
                  onClick={e => this.select(e)}
                >
                  Delete
                </button>
              </div>
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
                        Delete Plant
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
                        name={currentPlant._id}
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
      );
    });
  }
  render() {
    const styles = StyleSheet.create({
      plantDiv: {
        margin: "auto",
        padding: 30,
        maxWidth: "900px"
      }
    });
    const { addPlant, name } = this.state;
    return (
      <div className={css(styles.plantDiv)}>
        <h1 class="display-4">Plants</h1>
        <div className="row">{this.plantList()}</div>
        <button className="btn btn-outline-success" onClick={this.handleClick}>
          Add Plant
        </button>

        {addPlant ? (
          <div>
            {" "}
            <Divider />
            <Form onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Input
                  placeholder="Name of Plant"
                  name="name"
                  value={name}
                  onChange={this.handleChange}
                />
                <br />
                <Form.Button content="Submit" />{" "}
                {this.state.error ? (
                  <Alert color="danger">{this.state.error}</Alert>
                ) : null}
                {this.state.success ? (
                  <Alert color="success">{this.state.success}</Alert>
                ) : null}
              </Form.Group>
            </Form>
            {this.renderRedirect()}
          </div>
        ) : null}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  report: state.report,
  error: state.error
});
export default connect(mapStateToProps, { selectPlant, addPlant, clearAll })(
  Plants
);
