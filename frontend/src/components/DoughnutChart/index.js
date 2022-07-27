import "./style.css";
import DoughnutChart from "./DoughnutChart";
import Component from "../../core/component";
import { createElement, h } from "../../utils/domHandler";
import "./style.css";
import CategoryRankingList from "./CategoryRankingList";
import { getState, subscribe } from "../../core/store";
import { analyticsRankingState } from "../../store/analyticsState";
import Spinner from "../Spinner";

export default class DoughnutChartBox extends Component {
  constructor() {
    super();

    this.component = "doughnutChartBox";
    subscribe(analyticsRankingState, this.component, this.render.bind(this));

    this.render();
    this.setEvent();

    return this.$target;
  }

  getChildrenByIsLoading() {
    const { isLoading, analyticsList } = getState(analyticsRankingState);

    if (isLoading) {
      return new Spinner();
    } else if (analyticsList.length === 0) {
      return [
        h(
          "div",
          { class: "empty" },
          h("h1", { class: "empty-title" }, "휑"),
          h("h2", { class: "empty-subtitle" }, "가계부가 텅~")
        ),
      ];
    } else {
      return [new DoughnutChart(), new CategoryRankingList()];
    }
  }

  render() {
    const $children = this.getChildrenByIsLoading();

    const $target = createElement(h("section", { class: "doughnut-box" }, $children));

    if (!this.$target) {
      this.$target = $target;
    } else {
      this.reRender($target);
    }
  }
}
