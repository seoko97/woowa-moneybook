import Component from "../../core/component";
import { createElement, h } from "../../utils/domHandler";
import { dateHandler } from "../../utils/dateHandler";

class DateItem extends Component {
  constructor({ defaultDate, name }) {
    super();

    this.defaultDate = defaultDate;
    this.name = name;

    this.render();
    this.setEvent();

    return this.$target;
  }
  setEvent() {
    this.addEvent("click", ".form__item__date", this.onShowPicker.bind(this));
  }

  onShowPicker(e) {
    const $input = e.target.nextSibling;
    $input.showPicker();
  }

  render() {
    const { name, defaultDate } = this;

    const $target = createElement(
      h(
        "div",
        { class: "main--form__item" },
        h("h3", { class: "form__item__title" }, "일자"),
        h(
          "div",
          { class: "form__item--section" },

          h("input", {
            type: "date",
            name,
            max: dateHandler(new Date()),
            value: defaultDate,
          })
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

export default DateItem;
