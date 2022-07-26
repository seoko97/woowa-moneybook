import Component from "../../core/component";
import { createElement, h } from "../../utils/domHandler";
import { CATEGORY_COLORS } from "../../store/historyState";
import "./category.css";

class CategoryTag extends Component {
  constructor({ name }) {
    super();

    this.name = name;

    this.render();

    return this.$target;
  }

  render() {
    this.$target = createElement(h("span", { class: "ul__item__category" }, this.name));
    this.$target.style.backgroundColor = CATEGORY_COLORS[this.name];
  }
}

export default CategoryTag;
