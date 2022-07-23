import Component from "../../core/component";
import { dispatchCutomEvent } from "../../utils/customEventHandler";
import AnalyticsIcon from "../../../public/analyticsIcon.svg";
import CalendarIcon from "../../../public/calendarIcon.svg";
import HistoryIcon from "../../../public/historyIcon.svg";
import DateIndicator from "./DateIndicator";
import { createElement, h } from "../../utils/domHandler";
import Svg from "../../core/svg";
import "../../styles/header.css";

export default class Header extends Component {
  constructor() {
    super();

    this.render();
    this.setEvent();

    return this.$target;
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
    this.$target = createElement(
      h(
        "header",
        { class: "header" },
        h(
          "div",
          { class: "template" },
          h("div", { class: "header--logo" }, h("a", { href: "/" }, "우아한 가계부")),
          new DateIndicator({ $parent: this }),
          h(
            "nav",
            { class: "header--nav" },
            new Svg("a", { href: "/" }, HistoryIcon),
            new Svg("a", { href: "/calendar" }, CalendarIcon),
            new Svg("a", { href: "/analytics" }, AnalyticsIcon)
          )
        )
      )
    );
  }
}
