import "./style.css";
import Component from "../../core/component";
import { createElement, h } from "../../utils/domHandler";
import "./style.css";
import { getState, setState } from "../../core/store";
import { getTotalAmount, getTotalPercent } from "../../utils/doughnutGraphUtils";
import CategoryTag from "../CategoryTag";
import {
  analyticsRankingState,
  analyticsState,
  analyticsTrxListState,
} from "../../store/analyticsState";
import { dateState } from "../../store/dateState";
import { CATEGORY_COLORS } from "../../constants/category";
import { groupByMonth } from "../../utils/dateHandler";
import { requestGetCategoryYear } from "../../apis/analytics";

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
    this.addEvent("mouseover", ".category-list", this.onMouseHover);
    this.addEvent("mouseout", ".category-list", this.onMouseOut);
  }

  async onMouseClick(e) {
    const { target } = e;
    const $li = target.closest(".category-list--li");
    if (!$li) {
      return;
    }
    for (const li of $li.parentNode.children) {
      li.style.backgroundColor = null;
    }

    const { selectedCategory } = getState(analyticsState);
    const category = $li.dataset.category;
    if (selectedCategory !== category) {
      $li.style.backgroundColor = `${CATEGORY_COLORS[category]}30`;
    }
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

  onMouseHover(e) {
    const { target } = e;
    const $li = target.closest(".category-list--li");
    if (!$li) {
      return;
    }
    const category = $li.dataset.category;
    const { selectedCategory } = getState(analyticsState);
    const doughnutPart = document.querySelector(`[data-category='${category}']`);
    if (doughnutPart) {
      doughnutPart.style.transform = "scale(1.1)";
    }
    if (selectedCategory !== category) {
      $li.style.backgroundColor = `${CATEGORY_COLORS[category]}30`;
    }
  }

  onMouseOut(e) {
    const { target } = e;
    const $li = target.closest(".category-list--li");
    if (!$li) {
      return;
    }
    const category = $li.dataset.category;
    const { selectedCategory } = getState(analyticsState);
    const doughnutPart = document.querySelector(`[data-category='${category}']`);
    if (doughnutPart) {
      doughnutPart.style.transform = "scale(1)";
    }
    if (selectedCategory !== category) {
      $li.style.backgroundColor = null;
    }
  }

  makeCategoryList(data) {
    const totalPercent = getTotalPercent(data);
    return data.map(({ total, category: name }, i) => {
      return h(
        "li",
        { class: "category-list--li", "data-category": name },
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
