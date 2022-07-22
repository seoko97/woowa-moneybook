import Component from "../../core/component";
import { dispatchCutomEvent } from "../../utils/customEvent";
import AnalyticsIcon from "../../../public/analyticsIcon.svg";
import CalendarIcon from "../../../public/calendarIcon.svg";
import HistoryIcon from "../../../public/historyIcon.svg";
import DateIndicator from "./DateIndicator";
import "../../styles/header.css";

export default class Header extends Component {
  constructor() {
    super("header");

    this.$target.classList.add("header");
    this.$target.classList.add("template");
    this.render();
    this.setEvent();
  }

  setEvent() {
    this.addEvent("click", "a", (e) => {
      e.preventDefault();
      const $a = e.target.closest("a");
      if (!$a) return;
      const href = $a.getAttribute("href");
      if (href === location.pathname) {
        history.replaceState(null, null, href);
      } else {
        history.pushState(null, null, href);
      }
      dispatchCutomEvent("locationChange", window);
    });
  }
  render() {
    const $template = document.createElement("div");
    $template.classList.add("template");
    const $dateIndicator = new DateIndicator();

    const $logo = document.createElement("div");
    $logo.classList.add("header--logo");
    $logo.innerHTML = `<a href="/">우아한 가계부</a>`;

    const $nav = document.createElement("div");
    $nav.classList.add("header--nav");
    $nav.innerHTML = `
        <a href="/">
          ${HistoryIcon}
        </a>
        <a href="/calendar">
          ${CalendarIcon}
        </a>
        <a href="/analytics">
          ${AnalyticsIcon}
        </a>
    `;

    $template.append($logo);
    $template.append($dateIndicator);
    $template.append($nav);

    this.$target.append($template);
  }

  getElement() {
    return this.$target;
  }
}
