import { createElement, h } from "../utils/domHandler";

export default class Svg {
  constructor(type, props, svg) {
    this.$element = createElement(h(type, props));
    this.$element.innerHTML = svg;
    return this.$element;
  }
}
