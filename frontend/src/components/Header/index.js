import Component from "../../core/component";
import { dispatchCustomEvent } from "../../utils/customEventHandler";

import DateIndicator from "./DateIndicator";
import Navigation from "./Navigation";
import { createElement, h } from "../../utils/domHandler";
import "./header.css";
import { HEADER_CLASS } from "../../constants/category";

export default class Header extends Component {
  constructor() {
    super();

    this.render();
    this.setEvent();

    return this.$target;
  }

  setEvent() {
    this.addEvent("click", "a", this.onRoutePage.bind(this));
  }

  onRoutePage(e) {
    e.preventDefault();
    const $a = e.target.closest("a");

    if (!$a) return;

    const href = $a.getAttribute("href");

    if (href === location.pathname) return;

    history.pushState(null, null, href);
    dispatchCustomEvent("locationChange", window);
  }

  render() {
    const pathname = location.pathname;
    const headerClass = HEADER_CLASS[pathname] ?? "404";

    this.$target = createElement(
      h(
        "header",
        { class: `header ${headerClass}` },
        h(
          "div",
          { class: "template" },
          h("div", { class: "header--logo" }, h("a", { href: "/" }, "우아한 가계부")),
          new DateIndicator(),
          new Navigation()
        )
      )
    );
  }
}
