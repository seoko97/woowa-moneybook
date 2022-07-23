import Component from "../../core/component";
import LeftIcon from "../../../public/leftIcon.svg";
import RightIcon from "../../../public/rightIcon.svg";
import Svg from "../../core/svg";
import { dateState } from "../../store/dateState";
import { getState, setState, subscribe } from "../../core/store";
import { createElement, h } from "../../utils/domHandler";

export default class DateIndicator extends Component {
  constructor() {
    super();

    subscribe(dateState, this.render.bind(this));
    this.setState = setState(dateState);

    this.render();
    this.setEvent();

    return this.$target;
  }

  setEvent() {
    this.addEvent("click", "button", (e) => {
      const $button = e.target.closest("button");
      const date = getState(dateState);

      const newDate = { ...date };

      if ($button.classList.contains("date-indicator--left")) {
        newDate.month -= 1;
        this.setState(newDate);
      } else {
        newDate.month += 1;
        this.setState(newDate);
      }
    });
  }

  render() {
    const date = getState(dateState);

    const $newTarget = createElement(
      h(
        "div",
        { class: "header--date-indicator" },
        new Svg("button", { class: "date-indicator--left" }, LeftIcon),
        h(
          "div",
          { class: "date-indicator--date" },
          h("h1", null, `${date.month}월`),
          h("h3", null, `${date.year}`)
        ),
        new Svg("button", { class: "date-indicator--right" }, RightIcon)
      )
    );

    if (!this.$target) {
      this.$target = $newTarget;
    } else {
      this.reRender($newTarget);
    }
  }

  getTemplate() {
    return this.$target.outerHTML;
  }
}
