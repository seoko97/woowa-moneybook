import Svg from "../../core/svg";
import Component from "../../core/component";
import { createElement, h } from "../../utils/domHandler";
import { PAGE_INFO } from "../../constants/category";

class Navigation extends Component {
  constructor() {
    super();

    this.render();

    return this.$target;
  }

  getChildren() {
    const path = location.pathname;
    return PAGE_INFO.map(
      ({ href, $icon }) => new Svg("a", { href, class: `${href === path ? "focus" : ""}` }, $icon)
    );
  }

  render() {
    const $children = this.getChildren();

    this.$target = createElement(h("nav", { class: "header--nav" }, $children));
  }
}

export default Navigation;
