import Component from "../../core/component";
import LeftIcon from "../../../public/leftIcon.svg";
import RightIcon from "../../../public/rightIcon.svg";
import Svg from "../../core/svg";
import { dateState } from "../../store/dateState";
import { getState, setState, subscribe, unsubscribe } from "../../core/store";
import { createElement, h } from "../../utils/domHandler";
import { changeDate } from "../../utils/dateHandler";
import { historyState } from "../../store/historyState";
import { HISTORY_INITIAL_STATE } from "../../constants/history";

export default class DateIndicator extends Component {
  constructor() {
    super();

    this.component = "DateIndicator";

    subscribe(dateState, this.component, this.render.bind(this));

    this.setState = setState(dateState);
    this.setHistoryState = setState(historyState);

    this.render();
    this.setEvent();

    return this.$target;
  }

  removeEvent() {
    unsubscribe(dateState, this.component);
  }

  setEvent() {
    this.addEvent("click", "button", (e) => {
      const history = getState(historyState);

      if (history.id) {
        this.setHistoryState(HISTORY_INITIAL_STATE);
      }

      const $button = e.target.closest("button");
      const date = getState(dateState);

      const newDate = { ...date };

      if ($button.classList.contains("date-indicator--left")) {
        newDate.month -= 1;
      } else {
        newDate.month += 1;
      }

      const resultDate = changeDate(newDate);
      this.setState(resultDate);
    });
  }

  render() {
    const date = getState(dateState);

    const $target = createElement(
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
      this.$target = $target;
    } else {
      this.reRender($target);
    }
  }
}
