import Component from "../../core/component";
import { getState, subscribe } from "../../core/store";
import { createElement, h } from "../../utils/domHandler";
import Spinner from "../Spinner";
import HistoryList from "../HistoryListSection/HistoryList";
import { mappingHistoryByDate } from "../../utils/dateHandler";
import "../../styles/history.css";
import { analyticsTrxListState } from "../../store/analyticsState";
import { DIRECTION_INITIAL_STATE } from "../../constants/direction";

class AnalyticsListSection extends Component {
  constructor() {
    super();

    this.render();
    this.setEvent();

    subscribe(analyticsTrxListState, "AnalyticsListSection", this.render.bind(this));
    return this.$target;
  }

  getChildrenByIsLoading() {
    const { isLoading, analyticsTrxList } = getState(analyticsTrxListState);

    const mappedAnalyticsList = mappingHistoryByDate(analyticsTrxList);

    if (isLoading) {
      return new Spinner();
    } else {
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
