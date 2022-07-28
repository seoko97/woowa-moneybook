import Component from "../../core/component";
import { getState, setState } from "../../core/store";
import { isOpenModalState } from "../../store/isOpenModalState";
import { paymentListState } from "../../store/paymentState";
import { createElement, h } from "../../utils/domHandler";
import { historyState } from "../../store/historyState";
import { requestCreatePayment, requestDeletePayment } from "../../apis/payment";
import { MODAL_INITIAL_STATE } from "../../constants/modal";

class PaymentModalForm extends Component {
  isError = false;

  constructor() {
    super();

    this.modalState = getState(isOpenModalState);
    this.paymentListState = getState(paymentListState);
    this.historyState = getState(historyState);

    this.setModalState = setState(isOpenModalState);
    this.setPaymentListState = setState(paymentListState);
    this.setHistoryState = setState(historyState);

    this.render();
    this.setEvent();

    return this.$target;
  }

  setEvent() {
    this.addEvent("click", ".action-button", this.onClickActionButton.bind(this));
  }

  async onClickActionButton(e) {
    e.preventDefault();

    const $input = this.$target.querySelector(".modal__inner__input");

    if (!$input.value) {
      return;
    }

    const newModalState = { ...this.modalState };
    const newPaymentListState = [...this.paymentListState];

    if (newModalState.data.payment) {
      const selectedPaymentId = newModalState.data.payment.id;
      await requestDeletePayment({ paymentId: selectedPaymentId });
      const idx = newPaymentListState.findIndex((payment) => payment.id === selectedPaymentId);

      newPaymentListState.splice(idx, 1);
    } else {
      const isSelected = newPaymentListState.find((item) => item.title === $input.value);

      if (isSelected) {
        this.onChangeIsError();
        return;
      }

      const { paymentItem } = await requestCreatePayment({ title: $input.value });
      newPaymentListState.push(paymentItem);
    }

    this.setPaymentListState(newPaymentListState);
    this.setModalState(MODAL_INITIAL_STATE);
    this.setHistoryState({
      ...this.historyState,
      payment: null,
    });
  }

  onChangeIsError() {
    this.isError = true;
    this.render();
  }

  render() {
    const {
      data: { payment },
    } = this.modalState;

    const $target = createElement(
      h(
        "div",
        { class: "modal__inner" },
        h(
          "p",
          null,
          payment ? "해당 결제수단을 삭제하시겠습니까?" : "추가하실 결제수단을 적어주세요."
        ),
        h("input", {
          class: "modal__inner__input",
          placeholder: "입력하세요",
          value: payment?.title || "",
          disabled: payment?.title ? true : false,
        }),
        h(
          "p",
          { class: "modal__inner__error" },
          this.isError ? "이미 존재하는 결제수단입니다." : ""
        ),
        h(
          "div",
          { class: "modal__inner--button-form" },
          h("button", { class: "close", type: "click" }, "취소"),
          h(
            "button",
            { class: `${payment ? "delete" : "create"} action-button`, type: "click" },
            payment ? "삭제" : "등록"
          )
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

export default PaymentModalForm;
