import { createElement, h } from "../utils/domHandler";

export default class Svg {
  constructor(type, props, svg) {
    this.$element = createElement(h(type, props));
    if (typeof svg === "string") this.$element.innerHTML = svg;
    else this.$element.innerHTML = svg.outerHTML;
    return this.$element;
  }
}
