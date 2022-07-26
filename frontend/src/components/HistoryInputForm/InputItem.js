import Component from "../../core/component";
import { createElement, h } from "../../utils/domHandler";
import DirectionItem from "./DirectionItem";

class InputItem extends Component {
  constructor({ props }) {
    super();

    this.props = props;

    this.render();

    return this.$target;
  }

  render() {
    const text = this.props.name === "amount" ? "원" : "";
    const $direction = this.props.name === "amount" ? new DirectionItem() : "";

    const $target = createElement(
      h(
        "div",
        { class: "main--form__item" },
        h("h3", { class: "form__item__title" }, "내용"),
        h("div", { class: "form__item--section" }, $direction, h("input", this.props, ""), text)
      )
    );

    if (!this.$target) {
      this.$target = $target;
    } else {
      this.reRender($target);
    }
  }
}

export default InputItem;
