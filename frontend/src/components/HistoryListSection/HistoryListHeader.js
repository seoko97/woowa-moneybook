import Component from "../../core/component";
import { getState, setState, subscribe } from "../../core/store";
import { checkedDirectionState } from "../../store/checkedDirectionState";
import { createElement, h } from "../../utils/domHandler";
import CheckBox from "./CheckBox";

class HistoryListHeader extends Component {
  constructor() {
    super();

    this.setCheckedDirectionState = setState(checkedDirectionState);
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
    this.checkedDirection = getState(checkedDirectionState);
    const { _in, _out } = this.checkedDirection;

    const $target = createElement(
      h(
        "header",
        { class: "main--section--header" },

        h("h3", { class: "header__list-count" }, `전체 내역 ${14}건`),
        h(
          "section",
          { class: "header__checkbox-list" },
          new CheckBox({ type: "_in", totalAmount: 2234823590, checked: _in }),
          new CheckBox({ type: "_out", totalAmount: 3249238510, checked: _out })
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
