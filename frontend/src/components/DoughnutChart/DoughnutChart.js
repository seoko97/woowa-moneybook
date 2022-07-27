import Component from "../../core/component";
import { getState, setState } from "../../core/store";
import { createElement, h } from "../../utils/domHandler";
import { CATEGORY_COLORS } from "../../constants/category";
import Svg from "../../core/svg";
import { getDoughnutChartPaths, getTotalPercent } from "../../utils/doughnutGraphUtils";
import {
  RADIUS,
  ANIMATION_DURATION,
  ANIMATION_SPEED,
  INITIAL_DASH_OFFSET,
  STROKE_WIDTH,
} from "../../constants/doughnutChart";
import { analyticsRankingState, analyticsState } from "../../store/analyticsState";

export default class DoughnutChart extends Component {
  constructor() {
    super();

    this.setAnalyticsState = setState(analyticsState);

    this.render();
    this.setEvent();

    return this.$target;
  }

  setEvent() {
    this.addEvent("click", "svg", this.onClickPart);
  }

  onClickPart = (e) => {
    const { target } = e;
    const $part = target.closest(".doughnut--part");
    if (!$part) {
      return;
    }
    const curState = getState(analyticsState);
    if (curState.selectedCategory === $part.id) {
      return;
    }
    const newState = { ...curState };
    newState.selectedCategory = $part.id;
    this.setAnalyticsState(newState);
  };

  makeParts({ data, totalPercent, paths }) {
    let accDuration = 0;
    return data.map(({ category }, i) => {
      const targetRad = 2 * Math.PI * totalPercent[i] * RADIUS;
      const targetRestRad = 2 * Math.PI * (1 - totalPercent[i]) * RADIUS;
      const dasharray = `${targetRad} ${targetRestRad}`;
      const duration = ANIMATION_DURATION * (100 / ANIMATION_SPEED) * totalPercent[i];

      const animate = h("animate", {
        attributeName: "stroke-dashoffset",
        begin: `${accDuration}`,
        from: `${targetRad}`,
        to: `${RADIUS * INITIAL_DASH_OFFSET}`,
        dur: `${duration}`,
        fill: "freeze",
      });
      accDuration += duration;
      return h(
        "path",
        {
          class: "doughnut--part",
          id: `${category}`,
          d: paths[i],
          fill: "transparent",
          stroke: CATEGORY_COLORS[category],
          "stroke-dasharray": dasharray,
          "stroke-width": STROKE_WIDTH,
          "stroke-dashoffset": targetRad,
        },
        animate
      );
    });
  }

  render() {
    const { analyticsList: data } = getState(analyticsRankingState);
    const totalPercent = getTotalPercent(data);
    const paths = getDoughnutChartPaths(totalPercent, RADIUS);

    const $parts = this.makeParts({ data, totalPercent, paths });

    const $doughnut = createElement(
      h(
        "svg",
        {
          viewBox: "-15 -15 30 30",
          xmlns: "http://www.w3.org/2000/svg",
          class: "doughnut",
        },
        ...$parts
      )
    );
    this.$target = new Svg("div", { class: ["doughnut-container"] }, $doughnut);
  }
}
