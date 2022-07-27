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

  checkIsAmount() {
    const isAmount = this.props.name === "amount";
    const text = isAmount ? "원" : "";
    const heading = isAmount ? "금액" : "내용";
    const $direction = isAmount ? new DirectionItem() : "";

    return { text, $direction, heading };
  }

  render() {
    const { $direction, heading, text } = this.checkIsAmount();

    const $target = createElement(
      h(
        "div",
        { class: "main--form__item" },
        h("h3", { class: "form__item__title" }, heading),
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
