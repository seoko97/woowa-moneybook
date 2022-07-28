import Component from "../../core/component";
import { getState, subscribe } from "../../core/store";
import { createElement, h } from "../../utils/domHandler";
import Spinner from "../Spinner";
import HistoryList from "../HistoryListSection/HistoryList";
import { makeYearMonthToStr, mappingHistoryByDate } from "../../utils/dateHandler";
import "../../styles/history.css";
import { analyticsState, analyticsTrxListState } from "../../store/analyticsState";
import { DIRECTION_INITIAL_STATE } from "../../constants/direction";

class AnalyticsListSection extends Component {
  constructor() {
    super();

    this.render();
    this.setEvent();

    subscribe(analyticsState, "AnalyticsListSection", this.render.bind(this));
    return this.$target;
  }

  getChildrenByIsLoading() {
    const { isLoading, analyticsTrxList } = getState(analyticsTrxListState);
    const { selectedCategory, selectedYear, selectedMonth } = getState(analyticsState);
    let list;
    if (analyticsTrxList && analyticsTrxList[selectedCategory]) {
      list = analyticsTrxList[selectedCategory][makeYearMonthToStr(selectedYear, selectedMonth)];
    }

    if (isLoading) {
      return new Spinner();
    } else if (!list) {
      return new h("div", null);
    } else {
      const mappedAnalyticsList = mappingHistoryByDate(list);
      return new HistoryList({
        historyList: mappedAnalyticsList,
        checkedDirection: DIRECTION_INITIAL_STATE,
      });
    }
  }

  render() {
    const $children = this.getChildrenByIsLoading();

    const $target = createElement(h("section", { class: "main--section" }, $children));

    if (!this.$target) {
      this.$target = $target;
    } else {
      this.reRender($target);
    }
  }
}

export default AnalyticsListSection;
