import Component from "../../core/component";
import { createElement, h } from "../../utils/domHandler";
import "../../styles/history.css";
import HistoryListHeader from "./HistoryListHeader";
import HistoryList from "./HistoryList";

class HistoryListSection extends Component {
  constructor() {
    super();

    this.render();
    this.setEvent();

    return this.$target;
  }

  render() {
    const $target = createElement(
      h("section", { class: "main--section" }, new HistoryListHeader(), new HistoryList())
    );

    if (!this.$target) {
      this.$target = $target;
    } else {
      this.reRender($target);
    }
  }
}

export default HistoryListSection;
