import DropDown from ".";
import { createElement, h } from "../../utils/domHandler";
import CloseIcon from "../../../public/closeIcon.svg";
import Svg from "../../core/svg";
import { historyState } from "../../store/historyState";
import { getState, setState } from "../../core/store";

class PaymentList extends DropDown {
  constructor({ data }) {
    super();

    this.data = data;
    this.component = "PaymentList";
    this.setHistoryState = setState(historyState);

    this.render();
    this.setEvent();

    return this.$target;
  }

  setEvent() {
    this.addEvent("click", ".ul--li", (e) => {
      const $categoryItem = e.target.closest(".ul--li");
      const id = parseInt($categoryItem.dataset.id);

      const selectedItem = this.data.find((item) => item.id === id);

      if (!selectedItem) return;

      const newState = { ...getState(historyState) };
      newState.payment = selectedItem;

      this.setHistoryState(newState);
      this.$target.classList.toggle("active");
    });
  }

  render() {
    const $target = createElement(
      h(
        "ul",
        { class: "ul" },
        this.data.map(({ title, id }) =>
          h(
            "li",
            { class: "ul--li", ["data-id"]: String(id) },
            h(
              "p",
              { class: "ul--li__desc" },
              title,
              new Svg("span", { class: "icon delete" }, CloseIcon)
            )
          )
        ),
        h("li", { class: "ul--li" }, h("p", { class: "ul--li__desc" }, "추가하기"))
      )
    );

    if (!this.$target) {
      this.$target = $target;
    } else {
      this.reRender($target);
    }
  }
}

export default PaymentList;
