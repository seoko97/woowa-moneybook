import Component from "../core/component";
import HistoryInputForm from "../components/HistoryInputForm";
import HistoryListSection from "../components/HistoryListSection";
import { createElement, h } from "../utils/domHandler";
import { requestGetHistories } from "../apis/history";
import "../styles/main.css";
import { getState, setState, subscribe } from "../core/store";
import { dateState } from "../store/dateState";
import { historyListState } from "../store/historyState";
import { HISTORY_LIST_INITIAL_STATE } from "../constants/history";
import { paymentListState } from "../store/paymentState";
import { requestGetPayments } from "../apis/payment";

class HistoryPage extends Component {
  timer;
  constructor() {
    super();

    this.setHistoryListState = setState(historyListState);
    this.setPaymentListState = setState(paymentListState);

    subscribe(dateState, "HistoryPage", this.useDebounceByGetData.bind(this));

    this.getPaymentList();
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

  async getPaymentList() {
    const { paymentList } = await requestGetPayments();
    this.setPaymentListState(paymentList);
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
        { class: "main" },
        h("div", { class: "template" }, new HistoryInputForm(), new HistoryListSection())
      )
    );

    if (!this.$target) {
      this.$target = $target;
    } else if (!isLoading) {
      this.reRender($target);
    }
  }
}

export default HistoryPage;
