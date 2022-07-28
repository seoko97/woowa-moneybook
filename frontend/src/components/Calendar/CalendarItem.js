import Component from "../../core/component";
import { changeParsedDateByYMD } from "../../utils/dateHandler";
import { createElement, h } from "../../utils/domHandler";

class CalendarItem extends Component {
  constructor({ item, isCurrent }) {
    super();

    this.item = item;
    this.isCurrent = isCurrent;
    this.render();

    return this.$target;
  }

  render() {
    const { _in, _out, date } = this.item;

    const now = this.isCurrent ? "now" : "";
    const { day } = date ? changeParsedDateByYMD(date) : {};
    const sum = _in - _out;

    const $target = createElement(
      h(
        "div",
        { class: `calendar__item ${now}` },
        h(
          "div",
          { class: "calendar__item__section" },
          h("p", { class: "item__section__in" }, _in ? _in.toLocaleString() : ""),
          h("p", { class: "item__section__out" }, _out ? (_out * -1).toLocaleString() : ""),
          h("p", { class: "item__section__total" }, sum ? sum.toLocaleString() : "")
        ),

        h("p", { class: "item__section_day" }, day ? String(day) : "")
      )
    );

    this.$target = $target;
  }
}

export default CalendarItem;
