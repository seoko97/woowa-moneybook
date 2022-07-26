import Component from "../../core/component";
import { dispatchCutomEvent } from "../../utils/customEventHandler";

import DateIndicator from "./DateIndicator";
import Navigation from "./Navigation";
import { createElement, h } from "../../utils/domHandler";
import "../../styles/header.css";

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
    dispatchCutomEvent("locationChange", window);
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
          new DateIndicator(),
          new Navigation()
        )
      )
    );
  }
}
