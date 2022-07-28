import LineGraph from "../components/LineGraph";
import { createElement, h } from "../utils/domHandler";
import Component from "../core/component";
import "../styles/analytics.css";
import DoughnutChartBox from "../components/DoughnutChart";
import { getState, setState, subscribe } from "../core/store";
import { dateState } from "../store/dateState";
import {
  analyticsRankingState,
  analyticsState,
  analyticsTrxListState,
} from "../store/analyticsState";
import {
  ANALYTICS_RANKING_INITIAL_STATE,
  ANALYTICS_TRX_LIST_INITIAL_STATE,
} from "../constants/analytics";
import { requestGetCategoryRanking } from "../apis/analytics";
import AnalyticsListSection from "../components/AnalyticsListSection";

class AnalyticsPage extends Component {
  timer;
  constructor() {
    super();
    this.render();
    this.setAnalyticsRankingState = setState(analyticsRankingState);
    this.setAnalyticsState = setState(analyticsState);
    this.setAnalyticsTrxListState = setState(analyticsTrxListState);
    subscribe(dateState, "AnalyticsPage", this.useDebounceByGetData.bind(this));

    this.useDebounceByGetData();

    return this.$target;
  }

  useDebounceByGetData() {
    const { year, month } = getState(dateState);
    const newAnalyticsState = { selectedCategory: null, selectedMonth: month, selectedYear: year };
    this.setAnalyticsState(newAnalyticsState);
    this.setAnalyticsRankingState(ANALYTICS_RANKING_INITIAL_STATE);
    this.setAnalyticsTrxListState(ANALYTICS_TRX_LIST_INITIAL_STATE);
    const { isLoading } = getState(analyticsRankingState);

    if (!isLoading) {
      this.render();
    }

    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(this.getAnalyticsListData.bind(this), 500);
  }

  async getAnalyticsListData() {
    this.setAnalyticsRankingState(ANALYTICS_RANKING_INITIAL_STATE);
    const date = getState(dateState);
    const { eachCategoryExpenditure: analyticsList } = await requestGetCategoryRanking(date);

    // a페이지 data 로딩시작 - a페이지에서 b페이지로 이동 - a페이지 로딩 끝 render - 페이지가 이동되었기 떄문에 $target 없음 - 에러
    this.setAnalyticsRankingState({ isLoading: false, analyticsList });
    this.render();
  }

  render() {
    const $target = createElement(
      h(
        "main",
        { class: "main" },
        h(
          "div",
          { class: "template" },
          new DoughnutChartBox(),
          new LineGraph(),
          new AnalyticsListSection()
        )
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
