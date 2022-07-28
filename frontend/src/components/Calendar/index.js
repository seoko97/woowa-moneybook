import Component from "../../core/component";
import { getState, subscribe } from "../../core/store";
import { dateState } from "../../store/dateState";
import { historyListState } from "../../store/historyState";
import { changeDateByString, checkDate } from "../../utils/dateHandler";
import { createElement, h } from "../../utils/domHandler";
import { getCalendar } from "../../utils/getCalendar";
import { getSumByDate } from "../../utils/dateHandler";
import Spinner from "../Spinner";
import CalendarFooter from "./CalendarFooter";
import CalendarItem from "./CalendarItem";
import "./calendar.css";

class Calendar extends Component {
  constructor() {
    super();

    subscribe(historyListState, "HistoryListSection", this.render.bind(this));
    this.dateState = getState(dateState);
    this.render();

    return this.$target;
  }

  getTotalAmountByDate() {
    const total = { _in: 0, _out: 0 };
    const { year, month } = this.dateState;
    const { historyList } = this.historyListState;

    const sumByDirection = getSumByDate(historyList);
    const calendarData = getCalendar(`${year}-${checkDate(month)}-01`);

    for (let i = 0; i < calendarData.length; i++) {
      const dataByDate = calendarData[i];

      if (!dataByDate.date) {
        continue;
      }

      for (let j = 0; j < sumByDirection.length; j++) {
        const sumByDate = sumByDirection[j];
        if (sumByDate.date === dataByDate.date) {
          dataByDate._in += sumByDate._in;
          dataByDate._out += sumByDate._out;
          total._in += sumByDate._in;
          total._out += sumByDate._out;
        }
      }
    }

    return { calendarData, total };
  }

  getChildrenByIsLoading() {
    this.historyListState = getState(historyListState);
    const { isLoading } = this.historyListState;

    if (isLoading) {
      return new Spinner();
    } else {
      const { calendarData, total } = this.getTotalAmountByDate();
      const currentDate = changeDateByString(new Date());

      return [
        h(
          "div",
          { class: "calendar" },
          calendarData.map(
            (item) => new CalendarItem({ item, isCurrent: currentDate === item.date })
          )
        ),
        new CalendarFooter({ total }),
      ];
    }
  }

  render() {
    const $children = this.getChildrenByIsLoading();
    const $target = createElement(h("section", { class: "main-calendar--section" }, $children));

    if (!this.$target) {
      this.$target = $target;
    } else {
      this.reRender($target);
    }
  }
}

export default Calendar;
