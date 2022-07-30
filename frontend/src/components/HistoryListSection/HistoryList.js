import Component from "../../core/component";
import HistoryListBox from "../HistoryListBox";
import HistoryItemModal from "../Modal/HistoryItemModal";
import { historyListState, historyState } from "../../store/historyState";
import { paymentListState } from "../../store/paymentState";
import { isOpenModalState } from "../../store/isOpenModalState";
import { createElement, h } from "../../utils/domHandler";
import { getState, setState } from "../../core/store";
import { selectedHistoryState } from "../../store/selectedHistoryState";

class HistoryList extends Component {
  constructor({ historyList, checkedDirection }) {
    super();

    this.historyList = historyList;

    this.setHistoryState = setState(historyState);
    this.setModalState = setState(isOpenModalState);
    this.setSelectedHistoryState = setState(selectedHistoryState);

    this.checkedDirection = checkedDirection;
    this.isAnalytics = location.pathname === "/analytics";

    this.render();
    this.setEvent();

    return this.$target;
  }

  setEvent() {
    if (this.isAnalytics) {
      return;
    }
    this.addEvent("click", ".list__box--ul__item", this.onClickHistoryItem.bind(this));
  }

  onClickHistoryItem(e) {
    const { historyList } = getState(historyListState);
    const $el = e.target.closest(".list__box--ul__item");
    const historyId = $el.dataset.id;

    if (!historyId) {
      return;
    }

    const historyItem = historyList.find((item) => item.id === parseInt(historyId));

    if (!historyItem) {
      return;
    }

    const newHistoryItem = { ...historyItem };
    const paymentList = getState(paymentListState);
    const payment = paymentList.find((pay) => pay.title === newHistoryItem.payment) ?? null;

    newHistoryItem.payment = payment;

    this.setSelectedHistoryState(newHistoryItem.id);
    this.setModalState({
      isOpen: true,
      data: { history: newHistoryItem },
      component: HistoryItemModal,
    });
  }

  render() {
    const $target = createElement(
      h(
        "div",
        { class: "main--section__list" },
        this.historyList.map((item) => new HistoryListBox({ data: item }))
      )
    );

    if (!this.$target) {
      this.$target = $target;
    } else {
      this.reRender($target);
    }
  }
}

export default HistoryList;
