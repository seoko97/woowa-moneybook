import Component from "../../core/component";
import { createElement, h } from "../../utils/domHandler";
import "./spinner.css";

class Spinner extends Component {
  constructor() {
    super();

    this.render();

    return this.$target;
  }

  render() {
    this.$target = createElement(
      h("div", { class: "div__loading" }, h("div", { class: "div__loading__spinner" }))
    );
  }
}

export default Spinner;
