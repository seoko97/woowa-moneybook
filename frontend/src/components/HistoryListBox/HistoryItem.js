import Component from "../../core/component";
import { createElement, h } from "../../utils/domHandler";
import CategoryTag from "../CategoryTag";

class HistoryItem extends Component {
  constructor({ item }) {
    super();

    this.item = item;

    this.render();

    return this.$target;
  }

  render() {
    const { id, description, direction, category, payment, amount } = this.item;

    const $target = createElement(
      h(
        "li",
        { class: "list__box--ul__item", "data-id": id },
        h(
          "div",
          { class: "ul__item__inner description" },
          new CategoryTag({ name: category }),
          h("p", { class: "ul__item__description" }, description)
        ),
        h(
          "div",
          { class: "ul__item__inner payment" },
          h("span", { class: "ul__item__payment" }, payment),
          h(
            "span",
            { class: "ul__item__amount" },
            `${direction === "out" ? "-" : ""}${parseInt(amount).toLocaleString()}원`
          )
        )
      )
    );

    if (!this.$target) {
      this.$target = $target;
    } else {
      this.reRender($target);
    }
  }
}

export default HistoryItem;
