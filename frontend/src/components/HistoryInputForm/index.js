import DateItem from "./DateItem";
import SelectItem from "./SelectItem";
import InputItem from "./InputItem";
import CategoryList from "../DropDown/CategoryList";
import Button from "../Button";

import Component from "../../core/component";
import { getState, setState, subscribe } from "../../core/store";

import { historyState } from "../../store/historyState";

import { createElement, h } from "../../utils/domHandler";
import PaymentList from "../DropDown/PaymentList";
import Modal from "../Modal";
import { checkFormValidation } from "../../utils/checkFormValidation";

class HistoryInputForm extends Component {
  constructor() {
    super();

    this.setState = setState(historyState);

    this.render();
    this.setEvent();

    subscribe(historyState, "HistoryInputForm", this.render.bind(this));

    return this.$target;
  }

  setEvent() {
    this.addEvent("input", ".main--form", this.onChangeInput.bind(this));
    this.addEvent("focusout", ".form__item__input", this.onFoucsOutInput.bind(this));
    this.addEvent("submit", ".main--form", this.onSubmit.bind(this));
  }

  onSubmit(e) {
    e.preventDefault();
    const state = getState(historyState);
  }

  onFoucsOutInput(e) {
    const nodeName = e.target.name;
    const inputType = e.target.type;

    if (inputType !== "text" || !e.target.value) {
      return;
    }
    const newState = this.getNewStateByInput(nodeName, e.target.value);

    this.setState(newState);
  }

  onChangeInput(e) {
    const nodeName = e.target.name;

    if (nodeName == "amount") {
      let newValue = e.target.value
        .split(",")
        .join("")
        .replace(/[^-0-9]/g, "");

      if (newValue === "") {
        e.target.value = newValue;
        return;
      }

      e.target.value = parseInt(newValue).toLocaleString("ko-KR");
    } else if (nodeName === "trxDate") {
      const newState = this.getNewStateByInput(nodeName, e.target.value);
      this.setState(newState);
    }
  }

  getNewStateByInput(stateName, value) {
    const newState = { ...this.state };

    if (newState[stateName] === undefined) {
      return;
    }

    newState[stateName] = value;

    return newState;
  }

  render() {
    this.state = getState(historyState);

    const { id, ...data } = this.state;
    const isValid = checkFormValidation(data);

    const $target = createElement(
      h(
        "form",
        { class: "main--form" },
        new DateItem({ name: "trxDate", defaultDate: data.trxDate }),
        new SelectItem({
          title: "분류",
          defaultValue: data.category,
          children: CategoryList,
        }),
        new InputItem({
          props: {
            class: "form__item__input",
            placeholder: "입력하세요",
            name: "description",
            value: data.description,
          },
        }),
        new SelectItem({
          title: "결제수단",
          defaultValue: data.payment?.title || "",
          children: PaymentList,
        }),
        new InputItem({
          props: {
            class: "form__item__input",
            placeholder: "입력하세요",
            name: "amount",
            value: data.amount,
          },
        }),
        new Button({
          valid: isValid,
          props: {
            class: `button ${isValid ? "valid" : ""}`,
            disabled: !isValid,
          },
        }),
        new Modal()
      )
    );

    if (!this.$target) {
      this.$target = $target;
    } else {
      this.reRender($target);
    }
  }
}

export default HistoryInputForm;
