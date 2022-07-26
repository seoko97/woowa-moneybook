import Component from "../../core/component";
import { getState, setState } from "../../core/store";
import { historyState } from "../../store/historyState";
import { createElement, h } from "../../utils/domHandler";

class DirectionItem extends Component {
  constructor() {
    super();

    this.setState = setState(historyState);
    this.state = getState(historyState);

    this.render();
    this.setEvent();

    return this.$target;
  }

  setEvent() {
    this.addEvent("click", ".item--section__direction", this.onChangeDirection.bind(this));
  }

  onChangeDirection(e) {
    const $direction = e.target;

    if (!$direction) {
      return;
    }
    const newState = { ...this.state };

    const checkDirection = this.state.direction === "out";

    newState.direction = checkDirection ? "in" : "out";
    newState.category = "";

    this.setState(newState);
  }

  render() {
    const text = this.state.direction === "out" ? "-" : "+";

    const $target = createElement(h("span", { class: "item--section__direction" }, text));
    this.$target = $target;
  }
}

export default DirectionItem;
