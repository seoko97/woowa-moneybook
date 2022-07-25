import DropDown from ".";
import { createElement, h } from "../../utils/domHandler";
import CloseIcon from "../../../public/closeIcon.svg";
import Svg from "../../core/svg";
import { historyState } from "../../store/historyState";
import { isOpenModalState } from "../../store/isOpenModalState";
import { getState, setState } from "../../core/store";
import { paymentListState } from "../../store/paymentState";

class PaymentList extends DropDown {
  data = [];
  constructor() {
    super();

    this.component = "PaymentList";
    this.setHistoryState = setState(historyState);
    this.setIsOpenModalState = setState(isOpenModalState);

    this.render();
    this.setEvent();

    return this.$target;
  }

  setEvent() {
    this.addEvent("click", ".ul--li", this.onClickPaymentItem.bind(this));
  }

  onClickPaymentItem(e) {
    const $categoryItem = e.target.closest(".ul--li");

    if ($categoryItem.classList.contains("create")) {
      this.onOpenModal();
      return;
    }

    const id = parseInt($categoryItem.dataset.id);
    const selectedItem = this.data.find((item) => item.id === id);
    const $deleteButton = e.target.closest(".delete");

    if (!selectedItem) return;

    if ($deleteButton) {
      this.onOpenModal(selectedItem);
      return;
    }

    const newState = { ...getState(historyState) };
    newState.payment = selectedItem;

    this.setHistoryState(newState);
  }

  onOpenModal(selectedItem = null) {
    const modalState = getState(isOpenModalState);
    this.setIsOpenModalState({
      ...modalState,
      isOpen: true,
      payment: selectedItem,
    });
  }

  render() {
    this.data = getState(paymentListState);

    const $target = createElement(
      h(
        "ul",
        { class: "ul" },
        this.data.map(({ title, id }) =>
          h(
            "li",
            { class: "ul--li", ["data-id"]: String(id) },
            h(
              "div",
              { class: "ul--li__desc" },
              h("p", null, title),
              new Svg("span", { class: "icon delete" }, CloseIcon)
            )
          )
        ),
        h("li", { class: "ul--li create" }, h("p", { class: "ul--li__desc" }, "추가하기"))
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
