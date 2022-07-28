import Component from "../../core/component";
import { createElement, h } from "../../utils/domHandler";

class DecoEmpty extends Component {
  constructor(props) {
    super();

    this.props = props;
    this.render();

    return this.$target;
  }

  render() {
    const { title, description } = this.props;
    this.$target = createElement(
      h(
        "div",
        { class: "empty" },
        h("h1", { class: "empty--title" }, title),
        h("h2", { class: "empty--subtitle" }, description)
      )
    );
  }
}

export default DecoEmpty;
