import Component from "../../core/component";
import Svg from "../../core/svg";
import CheckIcon from "../../../public/checkIcon.svg";
import { createElement, h } from "../../utils/domHandler";

class Button extends Component {
  constructor({ valid, props, $icon }) {
    super();

    this.valid = valid;
    this.props = props;
    this.$icon = $icon;

    this.render();
    this.setEvent();

    return this.$target;
  }

  render() {
    const $target = createElement(
      h("button", this.props, new Svg("div", { class: "icon" }, this.$icon ?? CheckIcon))
    );
    this.$target = $target;
  }
}

export default Button;
