import Component from "../../core/component";
import { createElement, h } from "../../utils/domHandler";
import Svg from "../../core/svg";
import "./style.css";

export default class DoughnutChart extends Component {
  constructor() {
    super();

    this.render();

    return this.$target;
  }

  render() {
    const $doughnut = createElement(
      h("svg", {
        viewBox: "-15 -15 30 30",
        xmlns: "http://www.w3.org/2000/svg",
        class: "doughnut",
      })
    );
    this.$target = new Svg("div", { class: ["doughnut-container"] }, $doughnut);
  }
}
