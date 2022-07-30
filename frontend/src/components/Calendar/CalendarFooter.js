import Component from "../../core/component";
import { createElement, h } from "../../utils/domHandler";

class CalendarFooter extends Component {
  constructor({ total }) {
    super();

    this.total = total;

    this.render();

    return this.$target;
  }

  render() {
    const { _in, _out } = this.total;
    const $target = createElement(
      h(
        "div",
        { class: "calendar__footer" },
        h(
          "div",
          { class: "calendar__footer__in-out" },
          h(
            "div",
            { class: "calendar__footer_text-box" },
            h("span", null, "총 수입"),
            h("span", null, _in.toLocaleString())
          ),
          h(
            "div",
            { class: "calendar__footer_text-box" },
            h("span", null, "총 지출"),
            h("span", null, _out.toLocaleString())
          )
        ),
        h(
          "div",
          { class: "calendar__footer__total" },
          h(
            "div",
            { class: "calendar__footer_text-box" },
            h("span", null, "총계"),
            h("span", null, (_in - _out).toLocaleString())
          )
        )
      )
    );
    this.$target = $target;
  }
}

export default CalendarFooter;
