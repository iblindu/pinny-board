import React from "react";
import { Column, Row } from "simple-flexbox";
import { StyleSheet, css } from "aphrodite";
import LogoComponent from "./LogoComponent";
import MenuItemComponent from "./MenuItemComponent";
import IconBurger from "../../../assets/icon-burger";

import { connect } from "react-redux";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  burgerIcon: {
    cursor: "pointer",
    position: "absolute",
    left: 24,
    top: 10
  },
  container: {
    backgroundColor: "#ffffff",
    width: 255,
    paddingTop: 30,
    height: "calc(100% - 32px)"
  },
  containerMobile: {
    transition: "left 0.5s, right 0.5s",
    position: "absolute",
    width: 255,
    height: "calc(100% - 32px)",
    zIndex: 901
  },
  mainContainer: {
    height: "100%",
    minHeight: "100vh"
  },
  mainContainerMobile: {
    position: "absolute",
    width: "100vw",
    minWidth: "100%",
    top: 0,
    left: 0
  },
  menuItemList: {
    marginTop: 52
  },
  outsideLayer: {
    position: "absolute",
    width: "100vw",
    minWidth: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,.50)",
    zIndex: 900
  },
  separator: {
    borderTop: "1px solid #DFE0EB",
    marginTop: 16,
    marginBottom: 16,
    opacity: 0.06
  },
  hide: {
    left: -255
  },
  show: {
    left: 0
  }
});

class SidebarComponent extends React.Component {
  state = { expanded: false };

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  onItemClicked = item => {
    this.setState({ expanded: false });
    return this.props.onChange(item);
  };

  isMobile = () => window.innerWidth <= 768;

  toggleMenu = () =>
    this.setState(prevState => ({ expanded: !prevState.expanded }));

  renderBurger = () => {
    return (
      <div onClick={this.toggleMenu} className={css(styles.burgerIcon)}>
        <IconBurger />
      </div>
    );
  };

  render() {
    const { user } = this.props.auth;
    const { expanded } = this.state;
    const isMobile = this.isMobile();
    return (
      <div style={{ position: "relative" }}>
        <Row
          className={css(styles.mainContainer)}
          breakpoints={{ 768: css(styles.mainContainerMobile) }}
        >
          {isMobile && !expanded && this.renderBurger()}
          <Column
            className={css(styles.container)}
            breakpoints={{
              768: css(
                styles.containerMobile,
                expanded ? styles.show : styles.hide
              )
            }}
          >
            <a href="/home" style={{ textDecoration: "none" }}>
              <LogoComponent />
            </a>

            <Column className={css(styles.menuItemList)}>
              <a href="/dashboard" style={{ textDecoration: "none" }}>
                <MenuItemComponent title="Dashboard" />
              </a>
              {user.role === "administrator" || user.role === "technical" ? (
                <a href="/dashboard/reports" style={{ textDecoration: "none" }}>
                  <MenuItemComponent title="Logging Reports" />
                </a>
              ) : null}
              {user.role === "administrator" ||
              user.role === "urban-gardner" ||
              user.role === "client" ? (
                <a href="#" style={{ textDecoration: "none" }}>
                  <MenuItemComponent title="Sales Reports" />
                </a>
              ) : null}
              {user.role === "administrator" ||
              user.role === "urban-gardner" ? (
                <a
                  href="/dashboard/reporting"
                  style={{ textDecoration: "none" }}
                >
                  <MenuItemComponent title="Reporting Tool" />
                </a>
              ) : null}
            </Column>
          </Column>
          {isMobile && expanded && (
            <div
              className={css(styles.outsideLayer)}
              onClick={this.toggleMenu}
            ></div>
          )}
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(SidebarComponent);
