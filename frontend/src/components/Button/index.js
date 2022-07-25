import Component from "../../core/component";
import Svg from "../../core/svg";
import CheckIcon from "../../../public/checkIcon.svg";
import { createElement, h } from "../../utils/domHandler";

class Button extends Component {
  constructor() {
    super();
    this.render();
    this.setEvent();

    return this.$target;
  }

  render() {
    const $target = createElement(
      h(
        "button",
        { class: "button" },

        new Svg("span", { class: "icon" }, CheckIcon)
      )
    );
    this.$target = $target;
  }
}

export default Button;
