import Component from "../../core/component";
import { setState, subscribe } from "../../core/store";
import { checkedDirectionState } from "../../store/checkedDirectionState";
import { createElement, h } from "../../utils/domHandler";
import { getSumByDirection } from "../../utils/getSumByDirection";
import CheckBox from "./CheckBox";

class HistoryListHeader extends Component {
  constructor({ historyList, checkedDirection, totalLength }) {
    super();

    this.setCheckedDirectionState = setState(checkedDirectionState);
    this.historyList = historyList;
    this.checkedDirection = checkedDirection;
    this.totalLength = totalLength;

    subscribe(checkedDirectionState, "HistoryListHeader", this.render.bind(this));

    this.render();
    this.setEvent();

    return this.$target;
  }

  setEvent() {
    this.addEvent("click", ".header__checkbox-list__checkbox", this.onClickCheckbox.bind(this));
  }

  onClickCheckbox(e) {
    const $checkbox = e.target.closest(".header__checkbox-list__checkbox");

    const { type } = $checkbox.dataset;
    const newState = { ...this.checkedDirection };

    newState[type] = !newState[type];

    this.setCheckedDirectionState(newState);
  }

  render() {
    const { _in, _out } = this.checkedDirection;

    const { sum_in, sum_out } = getSumByDirection(this.historyList);

    const $target = createElement(
      h(
        "header",
        { class: "main--section--header" },

        h("h3", { class: "header__list-count" }, `전체 내역 ${this.totalLength}건`),
        h(
          "section",
          { class: "header__checkbox-list" },
          new CheckBox({ type: "_in", totalAmount: sum_in, checked: _in }),
          new CheckBox({ type: "_out", totalAmount: sum_out, checked: _out })
        )
      )
    );

    if (!this.$target) {
      this.$target = $target;
    } else {
      this.reRender($target);
    }
  }
}

export default HistoryListHeader;
