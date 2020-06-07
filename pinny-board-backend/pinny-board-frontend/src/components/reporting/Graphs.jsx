import React from "react";

import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  LineMarkSeries
} from "react-vis";

export default function Graphs(props) {
  return (
    <XYPlot width={600} height={300}>
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis />
      <YAxis />
      <LineMarkSeries
        className="linemark-series-example"
        style={{
          strokeWidth: "2px"
        }}
        lineStyle={{ stroke: "green" }}
        markStyle={{ stroke: "green" }}
        data={[
          { x: 1, y: 10 },
          { x: 2, y: 5 },
          { x: 3, y: 15 }
        ]}
      />
    </XYPlot>
  );
}
