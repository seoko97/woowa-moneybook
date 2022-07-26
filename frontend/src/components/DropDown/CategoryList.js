import DropDown from ".";
import { getState, setState } from "../../core/store";
import { CATEGORY } from "../../dummy";
import { historyState } from "../../store/historyState";
import { createElement, h } from "../../utils/domHandler";

class CategoryList extends DropDown {
  constructor() {
    super();

    this.data = CATEGORY;
    this.component = "CategoryList";
    this.setHistoryState = setState(historyState);

    this.render();
    this.setEvent();

    return this.$target;
  }

  setEvent() {
    this.addEvent("click", ".ul--li", this.onClickItem.bind(this));
  }

  onClickItem(e) {
    const $categoryItem = e.target.closest(".ul--li");
    const title = $categoryItem.dataset.title;

    const selectedItem = this.data.find((item) => item === title);

    if (!selectedItem) {
      return;
    }

    const newState = { ...getState(historyState) };

    newState.category = selectedItem;

    this.setHistoryState(newState);
  }

  render() {
    const $target = createElement(
      h(
        "ul",
        { class: "ul" },
        this.data.map((item) =>
          h("li", { class: "ul--li", "data-title": item }, h("p", { class: "ul--li__desc" }, item))
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

export default CategoryList;
