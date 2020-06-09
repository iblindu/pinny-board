import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";

import { ResponsiveLine } from "@nivo/line";
class Graphs extends Component {
  constructor() {
    super();

    this.state = {
      data: [],
      report: ""
    };
  }
  static propTypes = {
    micro: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
  };
  componentDidMount() {
    const { selectedMicro } = this.props.micro;
    const id = selectedMicro;
    const species = this.props.species;
    const body = JSON.stringify({ id, species });
    const config = {
      headers: {
        "Content-type": "application/json"
      }
    };

    if (this.props.report === "sales") {
      axios
        .post("/api/reporting/PlantSales", body, config)
        .then(response => {
          this.setState({ data: response.data, report: "sales" });
        })
        .catch(error => {
          console.log(error);
        });
    } else if (this.props.report === "production") {
      axios
        .post("/api/reporting/PlantProduction", body, config)
        .then(response => {
          this.setState({ data: response.data, report: "production" });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
  componentWillReceiveProps(nextProps) {
    const { selectedMicro } = this.props.micro;
    const id = selectedMicro;
    const species = nextProps.species;
    const body = JSON.stringify({ id, species });
    const config = {
      headers: {
        "Content-type": "application/json"
      }
    };
    const report = nextProps.report;
    if (report === "sales") {
      axios
        .post("/api/reporting/PlantSales", body, config)
        .then(response => {
          this.setState({ data: response.data, report: "sales" });
        })
        .catch(error => {
          console.log(error);
        });
    } else if (report === "production") {
      axios
        .post("/api/reporting/PlantProduction", body, config)
        .then(response => {
          this.setState({ data: response.data, report: "production" });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  render() {
    var { data } = this.state;
    data = data.reverse();
    const added = data.map(d => {
      var date = d.register_date.split("T");
      return { x: date[0], y: d.added };
    });
    const initial = data.map(d => {
      var date = d.register_date.split("T");
      return { x: date[0], y: d.initial };
    });
    const loses = data.map(d => {
      var date = d.register_date.split("T");
      return { x: date[0], y: d.loses };
    });
    const stock = data.map(d => {
      var date = d.register_date.split("T");
      return { x: date[0], y: d.initial - d.loses + d.added };
    });

    return (
      <div style={{ height: 400 }}>
        <ResponsiveLine
          data={[
            {
              id: "Added ",
              data: added
            },
            {
              id: "Initial ",
              data: initial
            },
            { id: "Stock", data: stock },
            { id: "Loses", data: loses }
          ]}
          margin={{ top: 50, right: 60, bottom: 100, left: 40 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: -24,
            max: "auto",
            stacked: true,
            reverse: false
          }}
          curve="natural"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: "bottom",
            tickSize: 4,
            tickPadding: 7,
            tickRotation: -90,
            legendOffset: 80,
            legendPosition: "middle"
          }}
          axisLeft={{
            orient: "left",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legendOffset: -40,
            legendPosition: "middle"
          }}
          enableGridX={false}
          colors={{ scheme: "category10" }}
          lineWidth={4}
          pointSize={2}
          pointColor={{ from: "color", modifiers: [] }}
          pointBorderWidth={5}
          pointBorderColor={{ theme: "background" }}
          pointLabel="y"
          pointLabelYOffset={-13}
          areaOpacity={0.05}
          useMesh={true}
          legends={[
            {
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 84,
              translateY: -7,
              itemsSpacing: 22,
              itemDirection: "top-to-bottom",
              itemWidth: 91,
              itemHeight: 25,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: "circle",
              symbolBorderColor: "rgba(0, 0, 0, .5)",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemBackground: "rgba(0, 0, 0, .03)",
                    itemOpacity: 1
                  }
                }
              ]
            }
          ]}
          motionStiffness={95}
          motionDamping={18}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  micro: state.micro,
  auth: state.auth
});

export default connect(mapStateToProps)(Graphs);
