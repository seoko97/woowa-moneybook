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
import { MONTH_UNIT } from "../../constants/lineGraph";
import { getState, subscribe } from "../../core/store";
import { analyticsState } from "../../store/analyticsState";

export default class LineGraph extends Component {
  constructor() {
    super();

    this.component = "LineGraph";
    subscribe(analyticsState, this.component, this.render.bind(this));

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
          "font-size": "4.5",
          "font-weight": "700",
          dy: dy,
        },
        `${total.toLocaleString()}`
      );
    });
  }

  makeLines({ pointsCoord, width, height, viewBoxWidth, viewBoxHeight, duration, category }) {
    return Array.from({ length: MONTH_UNIT - 1 }).map((_, i) => {
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
    let $target;
    const { selectedCategory } = getState(analyticsState);

    // 보여주지 않아도 되는 상황
    if (!selectedCategory) {
      $target = createElement(h("div", null));
    }
    // 보여줘야 하는 상황이라면
    else {
      const tmpData = [
        { month: 8, total: this.rand(0, 100) * 10000 },
        { month: 9, total: this.rand(0, 100) * 10000 },
        { month: 10, total: this.rand(0, 100) * 10000 },
        { month: 11, total: this.rand(0, 100) * 10000 },
        { month: 12, total: this.rand(0, 100) * 10000 },
        { month: 1, total: this.rand(0, 100) * 10000 },
        { month: 2, total: this.rand(0, 100) * 10000 },
        { month: 3, total: this.rand(0, 100) * 10000 },
        { month: 4, total: this.rand(0, 100) * 10000 },
        { month: 5, total: this.rand(0, 100) * 10000 },
        { month: 6, total: this.rand(0, 100) * 10000 },
        { month: 7, total: this.rand(0, 100) * 10000 },
      ];
      const data = makeFullDataArray({ data: tmpData, month: 7 });
      const viewBoxWidth = 200;
      const viewBoxHeight = 100;
      const width = 700;
      const height = 350;
      const borderColor = "grey";
      const horizontalUnit = 6;
      const verticalUnit = MONTH_UNIT - 2;
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

      const { selectedCategory: category } = getState(analyticsState);
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
          $lines,
          $texts
        )
      );

      $target = createElement(
        h(
          "section",
          { class: "line-graph--container" },
          h("h2", { class: "line-graph--title" }, `${category} 소비 추이`),
          new Svg("div", { class: "line-graph" }, lineGraph)
        )
      );
    }

    if (!this.$target) {
      this.$target = $target;
    } else {
      this.reRender($target);
    }
  }
}
