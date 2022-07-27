import "./style.css";
import Component from "../../core/component";
import { createElement, h } from "../../utils/domHandler";
import "./style.css";
import { getState } from "../../core/store";
import { getTotalAmount, getTotalPercent } from "../../utils/doughnutGraphUtils";
import CategoryTag from "../CategoryTag";
import { analyticsRankingState } from "../../store/analyticsState";
import { dateState } from "../../store/dateState";
import { CATEGORY_COLORS } from "../../constants/category";

export default class CategoryRankingList extends Component {
  constructor() {
    super();
    this.render();
    this.setEvent();
    return this.$target;
  }

  makeTitle(data) {
    const { year, month } = getState(dateState);
    return h(
      "h2",
      { class: "category-list--title" },
      `${year}년 ${month}월 지출 금액 ${getTotalAmount(data).toLocaleString()}`
    );
  }

  setEvent() {
    this.addEvent("click", ".category-list", this.onMouseClick);
  }

  onMouseClick(e) {
    const { target } = e;
    const $li = target.closest(".category-list--li");
    if (!$li) {
      return;
    }

    for (const li of $li.parentNode.children) {
      li.style.backgroundColor = null;
    }
    const category = $li.id;
    $li.style.backgroundColor = `${CATEGORY_COLORS[category]}30`;
  }

  makeCategoryList(data) {
    const totalPercent = getTotalPercent(data);
    return data.map(({ total, category: name }, i) => {
      return h(
        "li",
        { class: "category-list--li", id: name },
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
