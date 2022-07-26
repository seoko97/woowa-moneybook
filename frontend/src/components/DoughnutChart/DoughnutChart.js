import Component from "../../core/component";
import { getState } from "../../core/store";
import { doughnutState } from "../../store/doughnutState";
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

export default class DoughnutChart extends Component {
  constructor() {
    super();

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
    if (!$part) return;
    console.log($part.id);
  };

  makeParts({ dataset, totalPercent, paths }) {
    let accDuration = 0;
    return dataset.map(({ category }, i) => {
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
    const { categoryExpenditureList: dataset } = getState(doughnutState);
    const totalPercent = getTotalPercent(dataset);
    const paths = getDoughnutChartPaths(totalPercent, RADIUS);

    const $parts = this.makeParts({ dataset, totalPercent, paths });

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
