import Component from "../../core/component";
import { createElement, h } from "../../utils/domHandler";
import { WEEKDAY } from "../../constants/date";

class CalendarHeader extends Component {
  constructor() {
    super();

    this.render();

    return this.$target;
  }

  getChildrenByDay() {
    return WEEKDAY.map((DAY) => h("div", { class: "calendar-header__day" }, DAY));
  }
  render() {
    const $children = this.getChildrenByDay();

    const $target = createElement(h("header", { class: "calendar-header" }, $children));
    this.$target = $target;
  }
}

export default CalendarHeader;
