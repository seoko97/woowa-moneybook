import Component from "../core/component";
import { createElement, h } from "../utils/domHandler";
import { requestGetHistories } from "../apis/history";
import { getState, setState, subscribe } from "../core/store";
import { dateState } from "../store/dateState";
import { historyListState } from "../store/historyState";
import { HISTORY_LIST_INITIAL_STATE } from "../constants/history";
import CalendarHeader from "../components/Calendar/CalendarHeader";
import Calendar from "../components/Calendar";

class CalendarPage extends Component {
  timer;
  constructor() {
    super();

    this.setHistoryListState = setState(historyListState);

    subscribe(dateState, "CalendarPage", this.useDebounceByGetData.bind(this));

    this.useDebounceByGetData();
    this.render();

    return this.$target;
  }

  async getHistoryListData() {
    const date = getState(dateState);

    const { trxList, totalLength } = await requestGetHistories(date);

    this.setHistoryListState({ isLoading: false, totalLength, historyList: trxList });
    this.render();
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

  render() {
    const { isLoading } = getState(historyListState);

    const $target = createElement(
      h(
        "main",
        { class: "main calender" },
        h("div", { class: "template" }, new CalendarHeader(), new Calendar())
      )
    );

    if (!this.$target) {
      this.$target = $target;
    } else if (!isLoading) {
      this.reRender($target);
    }
  }
}

export default CalendarPage;
