import React, { Component } from "react";

import { Redirect } from "react-router";
import { connect } from "react-redux";
import { Column, Row } from "simple-flexbox";
import { StyleSheet, css } from "aphrodite";
import { BrowserRouter, Route } from "react-router-dom";
import PropTypes from "prop-types";
import HomeNavbarComponent from "../bars/Navbar/HomeNavbarComponent";
import Register from "../users/Register";
import ListOfUsers from "../users/ListOfUsers";
import ListOfMicrosere from "../microsere/ListOfMicrosere";
import AddMicrosera from "../microsere/AddMicrosera";
import EditMicrosera from "../microsere/EditMicrosera";

class Microsere extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool
  };

  componentDidMount() {
    window.addEventListener("resize", this.resize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
  }

  resize = () => this.forceUpdate();

  render() {
    const styles = StyleSheet.create({
      container: {
        height: "100%",
        minHeight: "100vh"
      },
      content: {
        marginTop: 54
      },
      mainBlock: {
        backgroundColor: "#F8FAF7",
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 0,
        paddingBottom: 30
      }
    });

    if (!this.props.isAuthenticated) {
      return <Redirect to="/" />;
    } else
      return (
        <BrowserRouter>
          <Row className={css(styles.container)}>
            <Column flexGrow={1} className={css(styles.mainBlock)}>
              <HomeNavbarComponent />
              <div>
                <Route path="/home" exact component={ListOfMicrosere} />

                <Route path="/home/new" exact component={AddMicrosera} />
                <Route path="/home/edit" exact component={EditMicrosera} />

                <Route path="/home/users" exact component={ListOfUsers} />
                <Route path="/home/users/new" exact component={Register} />
                {/* <Route path="/user" exact component={CreateUser} /> */}
              </div>
            </Column>
          </Row>
        </BrowserRouter>
      );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

// prettier-ignore
//connect allows us to get state from redux into a react component, when we use connect we have to export default connect(mapStateToProps, {any actions we wanna use})(Original Class)
export default connect(mapStateToProps)(Microsere);
