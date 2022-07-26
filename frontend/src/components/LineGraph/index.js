import Component from "../../core/component";
import { createElement, h } from "../../utils/domHandler";
import Svg from "../../core/svg";
import "./style.css";
import { CATEGORY_COLORS } from "../../constants/category";
import {
  getCoordinates,
  makeBoundary,
  makeFullDataArray,
  movePointsOffset,
} from "../../utils/lineGraphUtils";

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
      "stroke-width": "0.3",
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
          "stroke-width": "0.3",
          "stroke-dashoffset": `${viewBoxWidth}`,
          "stroke-dasharray": `${viewBoxWidth}`,
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
          "stroke-width": "0.3",
          "stroke-dashoffset": `${viewBoxHeight}`,
          "stroke-dasharray": `${viewBoxHeight}`,
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

  makePoints({ pointsCoord, category }) {
    return pointsCoord.map(([x, y]) => {
      return h("circle", { cx: x, cy: y, r: "1.5", fill: CATEGORY_COLORS[category] });
    });
  }

  makeTexts({ data, textPos, pointsCoord }) {
    return data.map(({ total }, i) => {
      const [anchor, dy] = textPos[i];
      return h(
        "text",
        {
          x: pointsCoord[i][0],
          y: pointsCoord[i][1],
          "text-anchor": anchor,
          "font-size": "6",
          dy: dy,
        },
        `${total.toLocaleString()}`
      );
    });
  }

  makeLines({ pointsCoord, width, height, viewBoxWidth, viewBoxHeight, duration, category }) {
    return Array.from({ length: 5 }).map((_, i) => {
      const [startX, startY] = pointsCoord[i];
      const [endX, endY] = pointsCoord[i + 1];
      const dx = (endX - startX) * (width / viewBoxWidth);
      const dy = (endY - startY) * (height / viewBoxHeight);
      const length = (dx ** 2 + dy ** 2) ** 0.5 * 0.35;
      const speed = duration * 0.1;
      return h(
        "path",
        {
          d: `M ${startX} ${startY} L ${endX} ${endY}`,
          stroke: CATEGORY_COLORS[category],
          "stroke-width": 0.5,
          "stroke-dasharray": `${length}`,
          "stroke-dashoffset": `${length}`,
        },
        h("animate", {
          attributeName: "stroke-dashoffset",
          begin: `${speed * i}`,
          dur: `${speed}`,
          from: `${length}`,
          to: "0",
          fill: "freeze",
        })
      );
    });
  }

  rand(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  render() {
    const tmpData = [
      { month: 10, total: this.rand(1, 100) * 10000 },
      { month: 11, total: this.rand(1, 100) * 10000 },
      { month: 12, total: this.rand(1, 100) * 10000 },
      { month: 1, total: this.rand(1, 100) * 10000 },
      { month: 2, total: this.rand(1, 100) * 10000 },
      { month: 3, total: this.rand(1, 100) * 10000 },
    ];
    const data = makeFullDataArray({ data: tmpData, month: 3 });
    const viewBoxWidth = 200;
    const viewBoxHeight = 100;
    const width = 600;
    const height = 400;
    const borderColor = "grey";
    const horizontalUnit = 6;
    const verticalUnit = 4;
    const divideLineColor = "rgba(0, 0, 0, 0.2)";
    const duration = 2;

    const [lowerBoundary, upperBoundary] = makeBoundary({ data, gapUnit: 6 });
    const pointsCoord = getCoordinates({
      data,
      viewBoxWidth,
      viewBoxHeight,
      lowerBoundary,
      upperBoundary,
    });
    const textPos = movePointsOffset(pointsCoord, viewBoxHeight);

    const $border = this.makeBorder({ viewBoxWidth, viewBoxHeight, borderColor });
    const $divideLines = this.makeDivideLine({
      viewBoxWidth,
      viewBoxHeight,
      horizontalUnit,
      verticalUnit,
      divideLineColor,
      duration,
    });
    const $texts = this.makeTexts({ data, textPos, pointsCoord });

    const category = "쇼핑/뷰티";
    const $points = this.makePoints({ pointsCoord, category });

    const $lines = this.makeLines({
      pointsCoord,
      width,
      height,
      viewBoxWidth,
      viewBoxHeight,
      duration,
      category,
    });

    const lineGraph = createElement(
      h(
        "svg",
        {
          viewBox: `0 0 ${viewBoxWidth} ${viewBoxHeight}`,
          xmlns: "http://www.w3.org/2000/svg",
          overflow: "visible",
          width: width,
          height: height,
        },
        $border,
        $divideLines,
        $points,
        $texts,
        $lines
      )
    );

    this.$target = new Svg("div", { class: "line-graph-container" }, lineGraph);
  }
}
