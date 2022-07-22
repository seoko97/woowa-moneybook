import { getState, subscribe } from "../core/store";
import { dateState } from "../store/dateState";

class HistoryPage {
  $target;
  constructor() {
    this.$target = document.createElement("main");

    subscribe(dateState, this.render.bind(this));

    this.render();
  }

  render() {
    const { month } = getState(dateState);

    this.$target.innerHTML = `
      <div>HistoryPage</div>
      <div>${month}</div>
    `;
  }
  getElement() {
    return this.$target;
  }
}

export default HistoryPage;
