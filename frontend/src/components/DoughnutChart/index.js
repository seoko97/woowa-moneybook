import "./style.css";
import DoughnutChart from "./DoughnutChart";
import Component from "../../core/component";
import { createElement, h } from "../../utils/domHandler";
import "./style.css";
import { getState } from "../../core/store";
import { doughnutState } from "../../store/doughnutState";
import { getTotalAmount, getTotalPercent } from "../../utils/doughnutGraphUtils";
import CategoryTag from "../CategoryTag";

export default class DoughnutChartBox extends Component {
  constructor() {
    super();

    this.render();
    this.setEvent();

    return this.$target;
  }

  makeCategoryList() {
    const { categoryExpenditureList: dataset } = getState(doughnutState);
    const totalPercent = getTotalPercent(dataset);
    return h(
      "ul",
      { class: "category-list" },
      h(
        "h2",
        { class: "category-list--title" },
        `이번 달 지출 금액 ${getTotalAmount(dataset).toLocaleString()}`
      ),
      dataset.map(({ total, category: name }, i) => {
        return h(
          "li",
          { class: "category-list--li" },
          h("div", { class: "category-li--label" }, new CategoryTag({ name })),
          h("p", { class: "category-li--percent" }, `${Math.round(totalPercent[i] * 100)}%`),
          h("p", { class: "category-li--amount" }, total.toLocaleString())
        );
      })
    );
  }

  render() {
    const $categoryList = this.makeCategoryList();
    const $target = createElement(
      h(
        "div",
        {
          class: "doughnut-box",
        },
        new DoughnutChart(),
        $categoryList
      )
    );

    if (!this.$target) {
      this.$target = $target;
    } else {
      this.reRender($target);
    }
  }
}
