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
import {
  MONTH_UNIT,
  BORDER_COLOR,
  VIEW_BOX_HEIGHT,
  MONTH_FONT_SIZE,
  MONTH_LABEL_DY,
  MONTH_TEXT_COLOR,
  VALUE_TEXT_COLOR,
  LINE_ANIMATION_SPEED,
  HORIZONTAL_DIVIDE_LINE_SPEED,
  VALUE_TEXT_SIZE,
  VALUE_TEXT_WEIGHT,
  LINE_LENGTH_COMPENSATION,
  DURATION,
  LINE_STROKE_WIDTH,
  VIEW_BOX_WIDTH,
  BORDER_STROKE_WIDTH,
  KEY_SPLINES,
  KEY_TIMES,
  DEFAULT_POINT_RADIUS,
  HEIGHT,
  WIDTH,
  VERTICAL_DIVIDE_LINE_SPEED,
  HORIZONTAL_LINE_UNIT,
} from "../../constants/lineGraph";
import { getState, subscribe } from "../../core/store";
import { analyticsState, analyticsTrxListState } from "../../store/analyticsState";
import { dateState } from "../../store/dateState";

export default class LineGraph extends Component {
  constructor() {
    super();

    this.component = "LineGraph";
    subscribe(analyticsState, this.component, this.render.bind(this));

    this.render();
    return this.$target;
  }

  makeBorder() {
    return h("path", {
      d: `M 0 0 H ${VIEW_BOX_WIDTH} V ${VIEW_BOX_HEIGHT} H 0 Z`,
      fill: "transparent",
      stroke: BORDER_COLOR,
      "stroke-width": BORDER_STROKE_WIDTH,
    });
  }

  makeDivideLine() {
    const horizontalUnit = HORIZONTAL_LINE_UNIT;
    const verticalUnit = MONTH_UNIT - 2;
    const horizontal = Array.from({ length: horizontalUnit }).map((_, i) => {
      return h(
        "path",
        {
          d: `M 0 ${
            VIEW_BOX_HEIGHT * ((horizontalUnit - i) / (horizontalUnit + 1))
          } H ${VIEW_BOX_WIDTH}`,
          stroke: BORDER_COLOR,
          "stroke-width": `${BORDER_STROKE_WIDTH}`,
          "stroke-dashoffset": `${VIEW_BOX_WIDTH}`,
          "stroke-dasharray": `${VIEW_BOX_WIDTH}`,
        },
        DURATION &&
          h("animate", {
            attributeName: "stroke-dashoffset",
            begin: `${DURATION * i * HORIZONTAL_DIVIDE_LINE_SPEED}`,
            dur: `${DURATION}`,
            from: `${VIEW_BOX_WIDTH}`,
            to: "0",
            fill: "freeze",
            calcMode: "spline",
            keySplines: KEY_SPLINES,
            keyTimes: KEY_TIMES,
          })
      );
    });
    const vertical = Array.from({ length: verticalUnit }).map((_, i) => {
      return h(
        "path",
        {
          d: `M ${VIEW_BOX_WIDTH * ((i + 1) / (verticalUnit + 1))} ${VIEW_BOX_HEIGHT} V 0`,
          stroke: BORDER_COLOR,
          "stroke-width": `${BORDER_STROKE_WIDTH}`,
          "stroke-dashoffset": `${VIEW_BOX_HEIGHT}`,
          "stroke-dasharray": `${VIEW_BOX_HEIGHT}`,
        },
        DURATION &&
          h("animate", {
            attributeName: "stroke-dashoffset",
            begin: `${DURATION * i * VERTICAL_DIVIDE_LINE_SPEED}`,
            dur: `${DURATION}`,
            from: `${VIEW_BOX_HEIGHT}`,
            to: "0",
            fill: "freeze",
            calcMode: "spline",
            keySplines: KEY_SPLINES,
            keyTimes: KEY_TIMES,
          })
      );
    });
    return [...horizontal, ...vertical];
  }

  makePoints({ pointsCoord, category }) {
    return pointsCoord.map(([x, y]) => {
      return h("circle", {
        cx: x,
        cy: y,
        r: `${DEFAULT_POINT_RADIUS}`,
        fill: CATEGORY_COLORS[category],
      });
    });
  }

  makeTexts({ data, textPos, pointsCoord }) {
    const { selectedYear, selectedMonth, selectedCategory } = getState(analyticsState);
    return data.map(({ year, month, total }, i) => {
      const [anchor, dy] = textPos[i];
      return h(
        "text",
        {
          x: pointsCoord[i][0],
          y: pointsCoord[i][1],
          "text-anchor": anchor,
          "font-size": `${VALUE_TEXT_SIZE}`,
          "font-weight": `${VALUE_TEXT_WEIGHT}`,
          fill:
            year === selectedYear && month === selectedMonth
              ? CATEGORY_COLORS[selectedCategory]
              : VALUE_TEXT_COLOR,
          dy: dy,
        },
        `${total.toLocaleString()}`
      );
    });
  }

  makeLines({ pointsCoord, category }) {
    return Array.from({ length: MONTH_UNIT - 1 }).map((_, i) => {
      const [startX, startY] = pointsCoord[i];
      const [endX, endY] = pointsCoord[i + 1];
      const dx = (endX - startX) * (WIDTH / VIEW_BOX_WIDTH);
      const dy = (endY - startY) * (HEIGHT / VIEW_BOX_HEIGHT);
      const length = (dx ** 2 + dy ** 2) ** 0.5 * LINE_LENGTH_COMPENSATION;
      const speed = DURATION * LINE_ANIMATION_SPEED;
      return h(
        "path",
        {
          d: `M ${startX} ${startY} L ${endX} ${endY}`,
          stroke: CATEGORY_COLORS[category],
          "stroke-width": LINE_STROKE_WIDTH,
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

  makeMonthLabel({ pointsCoord, data }) {
    return Array.from({ length: MONTH_UNIT }).map((_, i) => {
      return h(
        "text",
        {
          x: pointsCoord[i][0],
          y: VIEW_BOX_HEIGHT,
          "text-anchor": "middle",
          "font-size": `${MONTH_FONT_SIZE}`,
          dy: `${MONTH_LABEL_DY}`,
          fill: MONTH_TEXT_COLOR,
        },
        `${data[i].month}`
      );
    });
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
      const { year, month } = getState(dateState);
      const { sum } = getState(analyticsTrxListState);
      const sumData = sum[selectedCategory];
      const data = makeFullDataArray({ data: sumData, month, year });

      const [lowerBoundary, upperBoundary] = makeBoundary({ data, gapUnit: 6 });
      const pointsCoord = getCoordinates({
        data,
        lowerBoundary,
        upperBoundary,
      });
      const textPos = movePointsOffset(pointsCoord);

      const $border = this.makeBorder();
      const $divideLines = this.makeDivideLine();
      const $texts = this.makeTexts({ data, textPos, pointsCoord });

      const { selectedCategory: category } = getState(analyticsState);
      const $points = this.makePoints({ pointsCoord, category });

      const $lines = this.makeLines({ pointsCoord, category });
      const $monthLabels = this.makeMonthLabel({ pointsCoord, data });

      const lineGraph = createElement(
        h(
          "svg",
          {
            viewBox: `0 0 ${VIEW_BOX_WIDTH} ${VIEW_BOX_HEIGHT}`,
            xmlns: "http://www.w3.org/2000/svg",
            overflow: "visible",
            width: WIDTH,
            height: HEIGHT,
          },
          $border,
          $divideLines,
          $points,
          $lines,
          $texts,
          $monthLabels
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
