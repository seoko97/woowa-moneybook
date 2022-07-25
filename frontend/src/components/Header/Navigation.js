import Svg from "../../core/svg";
import Component from "../../core/component";
import AnalyticsIcon from "../../../public/analyticsIcon.svg";
import CalendarIcon from "../../../public/calendarIcon.svg";
import HistoryIcon from "../../../public/historyIcon.svg";
import { createElement, h } from "../../utils/domHandler";

class Navigation extends Component {
  constructor() {
    super();

    this.render();

    return this.$target;
  }

  render() {
    this.$target = createElement(
      h(
        "nav",
        { class: "header--nav" },
        new Svg("a", { href: "/" }, HistoryIcon),
        new Svg("a", { href: "/calendar" }, CalendarIcon),
        new Svg("a", { href: "/analytics" }, AnalyticsIcon)
      )
    );
  }
}

export default Navigation;
