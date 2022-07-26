import Component from "../core/component";
import HistoryInputForm from "../components/HistoryInputForm";
import HistoryListSection from "../components/HistoryListSection";
import { createElement, h } from "../utils/domHandler";
import "../styles/main.css";

class HistoryPage extends Component {
  constructor() {
    super();

    this.render();

    return this.$target;
  }

  render() {
    const $target = createElement(
      h(
        "main",
        { class: "main" },
        h("div", { class: "template" }, new HistoryInputForm(), new HistoryListSection())
      )
    );

    if (!this.$target) {
      this.$target = $target;
    } else {
      this.reRender($target);
    }
  }
}

export default HistoryPage;
