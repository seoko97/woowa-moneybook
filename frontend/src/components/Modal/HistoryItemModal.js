import Component from "../../core/component";
import { getState, setState } from "../../core/store";

import { MODAL_INITIAL_STATE } from "../../constants/modal";
import { createElement, h } from "../../utils/domHandler";
import { requestDeleteHistory } from "../../apis/history";

import { historyListState, historyState } from "../../store/historyState";
import { isOpenModalState } from "../../store/isOpenModalState";
import { HISTORY_INITIAL_STATE } from "../../constants/history";

class HistoryItemModal extends Component {
  isAsked = false;

  constructor() {
    super();

    this.modalState = getState(isOpenModalState);
    this.historyListState = getState(historyListState);
    this.historyState = getState(historyState);

    this.setModalState = setState(isOpenModalState);
    this.setHistoryListState = setState(historyListState);
    this.setHistoryState = setState(historyState);

    this.render();
    this.setEvent();

    return this.$target;
  }

  setEvent() {
    this.addEvent("click", ".action-button", this.onClickActionButton.bind(this));
  }

  onClickActionButton(e) {
    e.preventDefault();
    const { history } = this.modalState.data;
    const $button = e.target.closest(".action-button");
    const name = $button.name;

    if (name === "update") {
      this.updateInputForm(history);
    }

    if (name === "delete") {
      this.deleteHistory(history);
    }
  }

  updateInputForm(history) {
    this.setHistoryState(history);
    this.setModalState(MODAL_INITIAL_STATE);
  }

  async deleteHistory(history) {
    if (!this.isAsked) {
      this.isAsked = true;
      this.render();
      return;
    }

    const data = await requestDeleteHistory({ id: history.id });

    if (!data.ok) {
      return;
    }

    const newHistoryList = this.historyListState.historyList.filter(
      (item) => item.id !== history.id
    );

    this.setHistoryListState({
      ...this.historyListState,
      historyList: newHistoryList,
    });
    this.isAsked = false;
    this.setHistoryState(HISTORY_INITIAL_STATE);
    this.setModalState(MODAL_INITIAL_STATE);
  }

  getChildren() {
    const asked = this.isAsked ? "asked" : "";
    const desc = this.isAsked ? "정말 삭제하시겠습니까?" : "원하는 작업을 선택해주세요.";

    const $children = [
      h("p", { class: asked }, desc),
      h(
        "div",
        { class: "modal__inner--button-form" },
        h("button", { class: "close" }, "취소"),
        h(
          "div",
          { class: "inner__button-list" },
          h("button", { class: `delete action-button`, type: "submit", name: "delete" }, "삭제"),
          !this.isAsked
            ? h("button", { class: `update action-button`, type: "submit", name: "update" }, "수정")
            : ""
        )
      ),
    ];

    return $children;
  }

  render() {
    const $children = this.getChildren();

    const $target = createElement(h("form", { class: "modal__inner history" }, $children));

    if (!this.$target) {
      this.$target = $target;
    } else {
      this.reRender($target);
    }
  }
}

export default HistoryItemModal;
