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
  DASHARRAY_2ND_VALUE_FOR_ANI,
} from "../../constants/doughnutChart";
import {
  analyticsRankingState,
  analyticsState,
  analyticsTrxListState,
} from "../../store/analyticsState";
import { dateState } from "../../store/dateState";
import { requestGetCategoryYear } from "../../apis/analytics";
import { groupByMonth } from "../../utils/dateHandler";

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
    this.addEvent("mouseover", "svg", this.onMouseHover);
    this.addEvent("mouseout", "svg", this.onMouseout);
  }

  onMouseHover(e) {
    const { target } = e;
    const $part = target.closest(".doughnut--part");
    if (!$part) {
      return;
    }
    const category = $part.dataset.category;
    const { selectedCategory } = getState(analyticsState);
    const $li = document.querySelector(`[class='category-list--li'][data-category='${category}']`);
    if ($li && selectedCategory !== category) {
      $li.style.backgroundColor = `${CATEGORY_COLORS[category]}30`;
    }
    $part.style.transform = "scale(1.1)";
  }

  onMouseout(e) {
    const { target } = e;
    const $part = target.closest(".doughnut--part");
    if (!$part) {
      return;
    }
    const category = $part.dataset.category;
    const { selectedCategory } = getState(analyticsState);
    const $li = document.querySelector(`[class='category-list--li'][data-category='${category}']`);
    if ($li && selectedCategory !== category) {
      $li.style.backgroundColor = null;
    }
    $part.style.transform = "scale(1)";
  }

  async onClickPart(e) {
    const { target } = e;
    const $part = target.closest(".doughnut--part");
    if (!$part) {
      return;
    }
    const category = $part.dataset.category;
    for (const li of document.querySelector(".category-list").children) {
      if (li.dataset.category === category) {
        $part.style.backgroundColor = `${CATEGORY_COLORS[category]}30`;
      } else {
        li.style.backgroundColor = null;
      }
    }

    const { selectedCategory } = getState(analyticsState);
    const needChange = selectedCategory !== category;
    // this.setState로 할 경우 에러발생. 왜?
    const { analyticsTrxList, sum } = getState(analyticsTrxListState);
    if (!analyticsTrxList[category]) {
      const { year, month } = getState(dateState);
      const { trxList } = await requestGetCategoryYear({ year, month, category });
      const [curSum, curAnalyticsTrxList] = groupByMonth(trxList);
      const newAnalyticsTrxList = { ...analyticsTrxList, [category]: curAnalyticsTrxList };
      const newSum = { ...sum, [category]: curSum };
      setState(analyticsTrxListState)({ sum: newSum, analyticsTrxList: newAnalyticsTrxList });
    }
    if (needChange) {
      const newState = getState(analyticsState);
      newState.selectedCategory = category;
      setState(analyticsState)(newState);
      const location = document.querySelector(".line-graph--container")?.offsetTop;
      if (location) {
        window.scrollTo({ top: location, behavior: "smooth" });
      }
    }
  }

  makeParts({ data, totalPercent, paths }) {
    let accDuration = 0;
    return data.map(({ category }, i) => {
      const targetRad = 2 * Math.PI * totalPercent[i] * RADIUS;
      const dasharray = `${targetRad} ${DASHARRAY_2ND_VALUE_FOR_ANI}`;
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
          "data-category": `${category}`,
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
