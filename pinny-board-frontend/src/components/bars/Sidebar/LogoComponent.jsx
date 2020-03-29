import React, { Component } from "react";
import { Row } from "simple-flexbox";
import { StyleSheet, css } from "aphrodite";

class LogoComponent extends Component {
  render() {
    const styles = StyleSheet.create({
      container: {
        marginLeft: 32,
        marginRight: 32
      },
      title: {
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: 40,
        lineHeight: "30px",
        letterSpacing: "0.4px",
        color: "#1F6023"
      }
    });
    return (
      <Row
        className={css(styles.container)}
        horizontal="center"
        vertical="center"
      >
        <span className={css(styles.title)}>microsera</span>
      </Row>
    );
  }
}

export default LogoComponent;
