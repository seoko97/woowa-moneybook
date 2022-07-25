import LineGraph from "../components/LineGraph";
import { createElement, h } from "../utils/domHandler";
import Component from "../core/component";
import "../styles/analytics.css";

class AnalyticsPage extends Component {
  $target;

  constructor() {
    super();
    this.render();
    return this.$target;
  }

  render() {
    this.$target = createElement(
      h("main", { class: "main" }, h("div", { class: "template" }, new LineGraph()))
    );
  }

  getElement() {
    return this.$target;
  }
}

export default AnalyticsPage;
