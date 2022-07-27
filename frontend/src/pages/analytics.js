import LineGraph from "../components/LineGraph";
import { createElement, h } from "../utils/domHandler";
import Component from "../core/component";
import "../styles/analytics.css";
import DoughnutChartBox from "../components/DoughnutChart";
import { getState, setState, subscribe } from "../core/store";
import { dateState } from "../store/dateState";
import { requestGetHistories } from "../apis/history";
import { analyticsListState, analyticsState } from "../store/analyticsState";
import { ANALYTICS_INITIAL_STATE, ANALYTICS_LIST_INITIAL_STATE } from "../constants/analytics";

class AnalyticsPage extends Component {
  timer;
  constructor() {
    super();
    this.render();
    this.setAnalyticsListState = setState(analyticsListState);
    this.setAnalyticsState = setState(analyticsState);
    subscribe(dateState, "AnalyticsPage", this.useDebounceByGetData.bind(this));

    return this.$target;
  }

  useDebounceByGetData() {
    this.setAnalyticsState(ANALYTICS_INITIAL_STATE);
    const { isLoading } = getState(analyticsListState);

    if (!isLoading) {
      this.render();
    }

    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(this.getHistoryListData.bind(this), 500);
  }

  async getHistoryListData() {
    this.setAnalyticsListState(ANALYTICS_LIST_INITIAL_STATE);
    const date = getState(dateState);

    const { trxList, totalLength } = await requestGetHistories(date);

    this.setHistoryListState({ isLoading: false, totalLength, historyList: trxList });
    this.render();
  }

  render() {
    const $target = createElement(
      h(
        "main",
        { class: "main" },
        h("div", { class: "template" }, new DoughnutChartBox(), new LineGraph())
      )
    );

    if (!this.$target) {
      this.$target = $target;
    } else {
      this.reRender($target);
    }
  }

  getElement() {
    return this.$target;
  }
}

export default AnalyticsPage;
