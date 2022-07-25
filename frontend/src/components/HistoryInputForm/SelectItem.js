import Svg from "../../core/svg";
import Component from "../../core/component";
import DownArrowIcon from "../../../public/downArrowIcon.svg";
import { createElement, h } from "../../utils/domHandler";
import { getState, subscribe } from "../../core/store";
import { paymentListState } from "../../store/paymentState";

class SelectItem extends Component {
  constructor({ props, title, children, defaultValue }) {
    super();

    this.props = props;
    this.title = title;
    this.children = children;
    this.defaultValue = defaultValue;

    this.render();
    this.setEvent();

    return this.$target;
  }
  setEvent() {
    this.addEvent("click", ".form__item__select", this.onShowDropDown.bind(this));
    this.addEvent("click", ".overlay", this.detectOutsideClick.bind(this));
  }

  onShowDropDown() {
    this.component.classList.toggle("active");
    this.$target.querySelector(".overlay").classList.toggle("active");
  }

  detectOutsideClick(e) {
    const $payments = this.component;
    const $clickNode = e.target.closest(".form__item__select");
    const checkSibling = $clickNode === $payments.previousSibling;

    if (!checkSibling && $payments !== null && !$payments.contains(e.target)) {
      $payments.classList.remove("active");
      e.target.classList.remove("active");
    }
  }

  render() {
    this.component = new this.children();

    const $target = createElement(
      h(
        "div",
        { class: "main--form__item" },
        h("h3", { class: "form__item__title" }, this.title),
        h(
          "div",
          { class: `form__item__select ${this.defaultValue && "selected"}` },
          this.defaultValue || "선택하세요",
          new Svg("span", { class: "icon" }, DownArrowIcon)
        ),
        h("div", { class: "overlay" }, ""),
        this.component
      )
    );

    if (!this.$target) {
      this.$target = $target;
    } else {
      this.reRender($target);
    }
  }
}

export default SelectItem;
