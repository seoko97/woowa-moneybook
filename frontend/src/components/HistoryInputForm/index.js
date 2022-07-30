import DateItem from "./DateItem";
import SelectItem from "./SelectItem";
import InputItem from "./InputItem";
import CategoryList from "../DropDown/CategoryList";
import Button from "../Button";
import CloseIcon from "../../../public/closeIcon.svg";

import Component from "../../core/component";
import { getState, setState, subscribe } from "../../core/store";

import { historyListState, historyState } from "../../store/historyState";
import { dateState } from "../../store/dateState";
import { HISTORY_INITIAL_STATE } from "../../constants/history";

import { createElement, h } from "../../utils/domHandler";
import PaymentList from "../DropDown/PaymentList";
import { checkFormValidation } from "../../utils/checkFormValidation";
import { requestCreateHistory, requestUpdateHistory } from "../../apis/history";
import { changeParsedDateByYMD } from "../../utils/dateHandler";
import { checkValidByDataToData } from "../../utils/checkValidByDataToData";
import { selectedHistoryState } from "../../store/selectedHistoryState";
import "./form.css";

class HistoryInputForm extends Component {
  constructor() {
    super();

    this.historyListState = getState(historyListState);
    this.setHistoryState = setState(historyState);
    this.setHistoryListState = setState(historyListState);
    this.setSelectedHistoryState = setState(selectedHistoryState);
    subscribe(historyState, "HistoryInputForm", this.render.bind(this));

    this.render();
    this.setEvent();

    return this.$target;
  }

  setEvent() {
    this.addEvent("input", ".main--form", this.onChangeInput.bind(this));
    this.addEvent("focusout", ".form__item__input", this.onFocusOutInput.bind(this));
    this.addEvent("submit", ".main--form", this.onSubmit.bind(this));
    this.addEvent("click", ".button.close", this.onClickCloseButton.bind(this));
  }

  onClickCloseButton() {
    this.setHistoryState(HISTORY_INITIAL_STATE);
    this.setSelectedHistoryState(null);
  }

  async onSubmit(e) {
    e.preventDefault();
    const { id, payment, ...data } = getState(historyState);

    const isValid = checkFormValidation({ payment, ...data });

    if (!isValid) {
      return;
    }
    const bodyData = {
      ...data,
      paymentId: payment.id,
    };

    const { newHistory } = await (id
      ? requestUpdateHistory({ id, ...bodyData })
      : requestCreateHistory(bodyData));

    if (!newHistory) {
      return;
    }

    const { year, month } = getState(dateState);
    const itemYM = changeParsedDateByYMD(newHistory.trxDate);

    const checkDate = itemYM.year !== year || itemYM.month !== month;

    if (!id && checkDate) {
      this.setHistoryState(HISTORY_INITIAL_STATE);
      return;
    }

    const _historyListState = getState(historyListState);
    const newHistoryList = _historyListState.historyList.filter(
      (_history) => _history.id !== parseInt(id ?? -1)
    );

    if (!checkDate) {
      newHistoryList.unshift(newHistory);
    }

    newHistoryList.sort((c, b) => {
      if (c.trxDate > b.trxDate) return -1;
      else if (b.trxDate > c.trxDate) return 1;
      return 0;
    });

    if (id) {
      this.setSelectedHistoryState(null);
    }
    this.setHistoryListState({ ..._historyListState, historyList: newHistoryList });
    this.setHistoryState(HISTORY_INITIAL_STATE);
  }

  checkSameData(id, payment, bodyData) {
    if (!id) {
      return false;
    }
    const { historyList } = this.historyListState;
    const selectedItem = historyList.find((item) => item.id === id);
    const currentItem = {
      ...bodyData,
      id,
      payment: payment.title,
    };

    const isSame = checkValidByDataToData(selectedItem, currentItem);

    return isSame;
  }

  onFocusOutInput(e) {
    const nodeName = e.target.name;
    const inputType = e.target.type;

    if (inputType !== "text" || !e.target.value) {
      return;
    }

    const value =
      nodeName === "amount" ? parseInt(e.target.value.replaceAll(",", "")) : e.target.value;

    this.updateHistoryState(nodeName, value);
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
      this.updateHistoryState(nodeName, e.target.value);
    }
  }

  updateHistoryState(stateName, value) {
    const newState = { ...this.state };

    if (newState[stateName] === undefined) {
      return;
    }

    newState[stateName] = value;

    this.setHistoryState(newState);
  }

  getChildrenComponent() {
    this.state = getState(historyState);

    const { id, ...data } = this.state;
    const isValid = checkFormValidation(data);

    const $children = [
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
          value: data.amount ? parseInt(data.amount).toLocaleString() : "",
        },
      }),
      new Button({
        valid: isValid,
        props: {
          class: `button ${isValid ? "valid" : ""}`,
          disabled: !isValid,
          type: "submit",
        },
      }),
      id
        ? new Button({
            props: {
              class: `button close`,
              type: "button",
            },
            $icon: CloseIcon,
          })
        : "",
    ];
    return $children;
  }

  render() {
    const $children = this.getChildrenComponent();
    const $target = createElement(h("form", { class: "main--form" }, $children));

    if (!this.$target) {
      this.$target = $target;
    } else {
      this.reRender($target);
    }
  }
}

export default HistoryInputForm;
