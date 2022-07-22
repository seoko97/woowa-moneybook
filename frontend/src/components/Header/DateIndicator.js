import Component from "../../core/component";
import LeftIcon from "../../../public/leftIcon.svg";
import RightIcon from "../../../public/rightIcon.svg";
import { dateState } from "../../store/dateState";
import { getState, setState, subscribe } from "../../core/store";

export default class DateIndicator extends Component {
  constructor() {
    super("div");
    this.$target.classList.add("header--date-indicator");

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

    this.$target.innerHTML = /*html*/ `
      <button class="date-indicator--left">${LeftIcon}</button>
      <div class="date-indicator--date">
        <h1>${date.month}월</h1>
        <h3>${date.year}</h3>
      </div>
      <button class="date-indicator-right">${RightIcon}</button>
    `;
  }

  getTemplate() {
    return this.$target.outerHTML;
  }
}
