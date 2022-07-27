import "./style.css";
import DoughnutChart from "./DoughnutChart";
import Component from "../../core/component";
import { createElement, h } from "../../utils/domHandler";
import "./style.css";
import CategoryRankingList from "./CategoryRankingList";
import { getState, subscribe } from "../../core/store";
import { analyticsListState } from "../../store/analyticsState";
import Spinner from "../Spinner";

export default class DoughnutChartBox extends Component {
  constructor() {
    super();

    this.component = "doughnutChartBox";
    subscribe(analyticsListState, this.component, this.render.bind(this));

    this.render();
    this.setEvent();

    return this.$target;
  }

  getChildrenByIsLoading() {
    const { isLoading } = getState(analyticsListState);

    if (isLoading) {
      return new Spinner();
    } else {
      return [new DoughnutChart(), new CategoryRankingList()];
    }
  }

  render() {
    const $children = this.getChildrenByIsLoading();

    const $target = createElement(h("section", { class: "doughnut-box" }, $children));

    // const $target = createElement(
    //   h(
    //     "div",
    //     {
    //       class: "doughnut-box",
    //     },
    //     new DoughnutChart(),
    //     new CategoryRankingList()
    //   )
    // );

    if (!this.$target) {
      this.$target = $target;
    } else {
      this.reRender($target);
    }
  }
}
