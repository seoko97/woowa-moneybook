import Component from "../../core/component";
import { getState, subscribe } from "../../core/store";
import { selectedHistoryState } from "../../store/selectedHistoryState";
import { createElement, h } from "../../utils/domHandler";
import CategoryTag from "../CategoryTag";

class HistoryItem extends Component {
  constructor({ item }) {
    super();

    subscribe(selectedHistoryState, `HistoryItem${item.id}`, this.render.bind(this));

    this.item = item;
    this.render();

    return this.$target;
  }

  render() {
    const selectedHistoryId = getState(selectedHistoryState);
    const { id, description, direction, category, payment, amount } = this.item;
    const isSelected = id === selectedHistoryId;

    const $target = createElement(
      h(
        "li",
        { class: `list__box--ul__item ${isSelected ? "focus" : ""}`, "data-id": id },
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
