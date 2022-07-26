import LineGraph from "../components/LineGraph";
import { createElement, h } from "../utils/domHandler";
import Component from "../core/component";
import "../styles/analytics.css";
import DoughnutChartBox from "../components/DoughnutChart";

class AnalyticsPage extends Component {
  $target;

  constructor() {
    super();
    this.render();
    return this.$target;
  }

  render() {
    const $target = createElement(
      h(
        "main",
        { class: "main" },
        h("div", { class: "template" }, new DoughnutChartBox(), new LineGraph())
      )
    );

    if (!this.$target) {
      this.$target = $target;
    } else {
      this.reRender($target);
    }
  }

  getElement() {
    return this.$target;
  }
}

export default AnalyticsPage;
