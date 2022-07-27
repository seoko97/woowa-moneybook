import "./style.css";
import DoughnutChart from "./DoughnutChart";
import Component from "../../core/component";
import { createElement, h } from "../../utils/domHandler";
import "./style.css";
import CategoryRankingList from "./CategoryRankingList";

export default class DoughnutChartBox extends Component {
  constructor() {
    super();

    this.render();
    this.setEvent();

    return this.$target;
  }

  render() {
    const $target = createElement(
      h(
        "div",
        {
          class: "doughnut-box",
        },
        new DoughnutChart(),
        new CategoryRankingList()
      )
    );

    if (!this.$target) {
      this.$target = $target;
    } else {
      this.reRender($target);
    }
  }
}
