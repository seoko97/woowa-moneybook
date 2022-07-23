import Component from "../core/component";
import { getState, subscribe } from "../core/store";
import { dateState } from "../store/dateState";
import { createElement, h } from "../utils/domHandler";

class HistoryPage extends Component {
  constructor() {
    super();

    subscribe(dateState, this.render.bind(this));

    this.render();

    return this.$target;
  }

  render() {
    const { month } = getState(dateState);

    const $target = createElement(
      h("main", null, h("div", null, "HistoryPage"), h("div", null, `${month}`))
    );

    if (!this.$target) {
      this.$target = $target;
    } else {
      this.reRender($target);
    }
  }
}

export default HistoryPage;
