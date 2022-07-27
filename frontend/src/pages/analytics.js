import LineGraph from "../components/LineGraph";
import { createElement, h } from "../utils/domHandler";
import Component from "../core/component";
import "../styles/analytics.css";
import DoughnutChartBox from "../components/DoughnutChart";
import { getState, subscribe } from "../core/store";
import { dateState } from "../store/dateState";
import { historyListState } from "../store/historyState";
import { HISTORY_LIST_INITIAL_STATE } from "../constants/history";
import { requestGetHistories } from "../apis/history";

class AnalyticsPage extends Component {
  timer;
  constructor() {
    super();
    this.render();

    subscribe(dateState, "AnalyticsPage", this.useDebounceByGetData.bind(this));

    return this.$target;
  }

  useDebounceByGetData() {
    const { isLoading } = getState(historyListState);

    if (!isLoading) {
      this.setHistoryListState(HISTORY_LIST_INITIAL_STATE);
      this.render();
    }

    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(this.getHistoryListData.bind(this), 500);
  }

  async getHistoryListData() {
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
