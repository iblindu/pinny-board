import React, { Component } from "react";

import { Redirect } from "react-router";
import { connect } from "react-redux";
import { Column, Row } from "simple-flexbox";
import { StyleSheet, css } from "aphrodite";
import { BrowserRouter, Route } from "react-router-dom";

import PropTypes from "prop-types";
import NavbarComponent from "../bars/Navbar/NavbarComponent";
import SidebarComponent from "../bars/Sidebar/SidebarComponent";
import Dashboard from "../dashboard/Dashboard";
import Reports from "../reports/Reports";

class Main extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    micro: PropTypes.object.isRequired
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
        paddingLeft: 50,
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
            <SidebarComponent />
            <Column flexGrow={1} className={css(styles.mainBlock)}>
              <NavbarComponent />
              <div>
                <Route path="/dashboard" exact component={Dashboard} />

                {/* <Route path="/edit/:id" exact component={EditExercise} /> */}

                <Route path="/dashboard/reports" exact component={Reports} />

                {/* <Route path="/user" exact component={CreateUser} /> */}
              </div>
            </Column>
          </Row>
        </BrowserRouter>
      );
  }
}

const mapStateToProps = state => ({
  micro: state.micro,
  isAuthenticated: state.auth.isAuthenticated
});

// prettier-ignore
//connect allows us to get state from redux into a react component, when we use connect we have to export default connect(mapStateToProps, {any actions we wanna use})(Original Class)
export default connect(mapStateToProps)(Main);
