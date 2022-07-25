import Component from "../../core/component";
import { createElement, h } from "../../utils/domHandler";
import Svg from "../../core/svg";
import "./style.css";

export default class LineGraph extends Component {
  constructor() {
    super();

    this.render();

    return this.$target;
  }

  makeBorder({ viewBoxWidth, viewBoxHeight, borderColor }) {
    return h("path", {
      d: `M 0 0 H ${viewBoxWidth} V ${viewBoxHeight} H 0 Z`,
      fill: "transparent",
      stroke: borderColor,
      ["stroke-width"]: "0.3",
    });
  }

  makeDivideLine({
    viewBoxWidth,
    viewBoxHeight,
    horizontalUnit,
    verticalUnit,
    divideLineColor,
    duration,
  }) {
    const horizontal = Array.from({ length: horizontalUnit }).map((_, i) => {
      return h(
        "path",
        {
          d: `M 0 ${
            viewBoxHeight * ((horizontalUnit - i) / (horizontalUnit + 1))
          } H ${viewBoxWidth}`,
          stroke: divideLineColor,
          ["stroke-width"]: "0.3",
          ["stroke-dashoffset"]: `${viewBoxWidth}`,
          ["stroke-dasharray"]: `${viewBoxWidth}`,
        },
        duration &&
          h("animate", {
            attributeName: "stroke-dashoffset",
            begin: `${duration * i * 0.1}`,
            dur: `${duration}`,
            from: `${viewBoxWidth}`,
            to: "0",
            fill: "freeze",
            calcMode: "spline",
            keySplines: "0.1 0.8 0.2 1;0.1 0.8 0.2 1",
            keyTimes: "0;0.5;1",
          })
      );
    });
    const vertical = Array.from({ length: verticalUnit }).map((_, i) => {
      return h(
        "path",
        {
          d: `M ${viewBoxWidth * ((i + 1) / (verticalUnit + 1))} ${viewBoxHeight} V 0`,
          stroke: divideLineColor,
          ["stroke-width"]: "0.3",
          ["stroke-dashoffset"]: `${viewBoxHeight}`,
          ["stroke-dasharray"]: `${viewBoxHeight}`,
        },
        duration &&
          h("animate", {
            attributeName: "stroke-dashoffset",
            begin: `${duration * i * 0.05}`,
            dur: `${duration}`,
            from: `${viewBoxHeight}`,
            to: "0",
            fill: "freeze",
            calcMode: "spline",
            keySplines: "0.1 0.8 0.2 1;0.1 0.8 0.2 1",
            keyTimes: "0;0.5;1",
          })
      );
    });
    return [...horizontal, ...vertical];
  }

  render() {
    const viewBoxWidth = 200;
    const viewBoxHeight = 100;
    const width = 600;
    const height = 400;
    const borderColor = "grey";
    const horizontalUnit = 10;
    const verticalUnit = 12;
    const divideLineColor = "rgba(0, 0, 0, 0.2)";
    const duration = 2;

    const $border = this.makeBorder({ viewBoxWidth, viewBoxHeight, borderColor });
    const $divideLines = this.makeDivideLine({
      viewBoxWidth,
      viewBoxHeight,
      horizontalUnit,
      verticalUnit,
      divideLineColor,
      duration,
    });
    const lineGraph = createElement(
      h("svg", {
        viewBox: `0 0 ${viewBoxWidth} ${viewBoxHeight}`,
        xmlns: "http://www.w3.org/2000/svg",
        overflow: "visible",
        width: width,
        height: height,
      }),
      $border,
      ...$divideLines
    );

    this.$target = new Svg("div", { class: "line-graph-container" }, lineGraph);
  }
}
