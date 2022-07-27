import Component from "../../core/component";
import { getState, setState, subscribe } from "../../core/store";
import { createElement, h } from "../../utils/domHandler";
import { isOpenModalState } from "../../store/isOpenModalState";
import "./modal.css";

class Modal extends Component {
  constructor() {
    super();

    subscribe(isOpenModalState, "Modal", this.render.bind(this));

    this.state = getState(isOpenModalState);
    this.setState = setState(isOpenModalState);

    this.render();
    this.setEvent();

    return this.$target;
  }

  setEvent() {
    this.addEvent("click", ".overlay", this.onCloseModal.bind(this));
    this.addEvent("click", ".close", this.onCloseModal.bind(this));
  }

  onCloseModal() {
    this.setState({ ...this.state, isOpen: false, data: null });
  }

  getChildrenByIsOpen({ isOpen, component }) {
    return isOpen ? [h("div", { class: "overlay active" }), new component()] : "";
  }

  render() {
    const { isOpen, component } = getState(isOpenModalState);
    const $inner = this.getChildrenByIsOpen({ isOpen, component });

    const $target = createElement(h("div", { class: `modal ${isOpen && "active"}` }, $inner));

    if (!this.$target) {
      this.$target = $target;
    } else {
      this.reRender($target);
    }
  }
}

export default Modal;
