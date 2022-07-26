import Component from "../../core/component";
import { createElement, h } from "../../utils/domHandler";
import Button from "../Button";

class CheckBox extends Component {
  constructor({ type, totalAmount, checked }) {
    super();

    this.type = type;
    this.totalAmount = totalAmount;
    this.checked = checked;

    this.render();
    this.setEvent();

    return this.$target;
  }

  render() {
    const { type, totalAmount, checked } = this;

    const $target = createElement(
      h(
        "div",
        { class: `header__checkbox-list__checkbox ${checked && "checked"}`, "data-type": type },
        new Button({
          props: {
            class: "button",
          },
        }),
        h(
          "span",
          { class: "amount" },
          `${type === "in" ? "수입" : "지출"} `,
          parseInt(totalAmount).toLocaleString()
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

export default CheckBox;
