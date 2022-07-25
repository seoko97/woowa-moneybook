import Component from "../../core/component";
import { createElement, h } from "../../utils/domHandler";
import Svg from "../../core/svg";
import "./style.css";

export default class LineGraph extends Component {
  constructor() {
    super();

    this.render();

    return this.$target;
  }

  render() {
    const width = 200;
    const height = 100;
    const widthLength = 600;
    const heightLength = 400;

    const lineGraph = createElement(
      h("svg", {
        viewBox: `0 0 ${width} ${height}`,
        xmlns: "http://www.w3.org/2000/svg",
        overflow: "visible",
        width: widthLength,
        height: heightLength,
      })
    );

    this.$target = new Svg("div", { class: "line-graph-container" }, lineGraph);
  }
}
