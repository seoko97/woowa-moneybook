import Component from "../../core/component";
import HistoryItem from "./HistoryItem";
import { getWeekDay } from "../../utils/dateHandler";
import { createElement, h } from "../../utils/domHandler";
import { parsingStringDate } from "../../utils/dateHandler";
import { getSumByDirection } from "../../utils/getSumByDirection";

class HistoryListBox extends Component {
  constructor({ data }) {
    super();

    this.data = data;

    this.render();
    this.setEvent();

    return this.$target;
  }

  render() {
    const { trxDate, trxList } = this.data;
    const { sum_in, sum_out } = getSumByDirection(trxList);

    const weekDay = getWeekDay(trxDate);

    const $target = createElement(
      h(
        "section",
        { class: "section__list__box" },

        h(
          "div",
          { class: "list__box--header" },
          h(
            "h3",
            { class: "box--header__heading" },
            parsingStringDate(trxDate),
            h("span", { class: "etc" }, weekDay)
          ),
          h(
            "div",
            { class: "box--header__direction etc" },
            sum_in ? h("span", { class: "direction_in" }, `수입 ${sum_in.toLocaleString()}`) : "",
            sum_out ? h("span", { class: "direction_out" }, `지출 ${sum_out.toLocaleString()}`) : ""
          )
        ),

        h(
          "ul",
          { class: "list__box--ul" },
          trxList.map((item) => new HistoryItem({ item }))
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

export default HistoryListBox;
