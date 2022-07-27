import "./style.css";
import Component from "../../core/component";
import { createElement, h } from "../../utils/domHandler";
import "./style.css";
import { getState } from "../../core/store";
import { getTotalAmount, getTotalPercent } from "../../utils/doughnutGraphUtils";
import CategoryTag from "../CategoryTag";
import { analyticsRankingState } from "../../store/analyticsState";

export default class CategoryRankingList extends Component {
  constructor() {
    super();
    this.render();
    this.setEvent();
    return this.$target;
  }

  makeTitle(data) {
    return h(
      "h2",
      { class: "category-list--title" },
      `이번 달 지출 금액 ${getTotalAmount(data).toLocaleString()}`
    );
  }

  makeCategoryList(data) {
    const totalPercent = getTotalPercent(data);
    return data.map(({ total, category: name }, i) => {
      return h(
        "li",
        { class: "category-list--li" },
        h("div", { class: "category-li--label" }, new CategoryTag({ name })),
        h("p", { class: "category-li--percent" }, `${Math.round(totalPercent[i] * 100)}%`),
        h("p", { class: "category-li--amount" }, total.toLocaleString())
      );
    });
  }

  render() {
    const { analyticsList: data } = getState(analyticsRankingState);
    const $categoryList = this.makeCategoryList(data);
    const $title = this.makeTitle(data);
    const $target = createElement(h("ul", { class: "category-list" }, $title, $categoryList));

    if (!this.$target) {
      this.$target = $target;
    } else {
      this.reRender($target);
    }
  }
}
