import Component from "../../core/component";
import { getState, subscribe } from "../../core/store";
import { historyListState } from "../../store/historyState";
import { checkedDirectionState } from "../../store/checkedDirectionState";
import { createElement, h } from "../../utils/domHandler";
import Spinner from "../Spinner";
import HistoryList from "./HistoryList";
import HistoryListHeader from "./HistoryListHeader";
import { getHistoryListByDirection } from "../../utils/getHistoryListByDirection";
import { mappingHistoryByDate } from "../../utils/dateHandler";
import "./history.css";
class HistoryListSection extends Component {
  constructor() {
    super();

    this.render();
    this.setEvent();

    subscribe(checkedDirectionState, "HistoryListSection", this.render.bind(this));
    subscribe(historyListState, "HistoryListSection", this.render.bind(this));

    return this.$target;
  }

  getChildrenByIsLoading() {
    const { isLoading, historyList } = getState(historyListState);
    const checkedDirection = getState(checkedDirectionState);

    const historyListByDirection = getHistoryListByDirection(historyList, checkedDirection);
    const mappedHistoryList = mappingHistoryByDate(historyListByDirection);

    if (isLoading) {
      return new Spinner();
    } else {
      return [
        new HistoryListHeader({
          historyList,
          totalLength: historyListByDirection.length,
          checkedDirection,
        }),
        new HistoryList({ historyList: mappedHistoryList, checkedDirection }),
      ];
    }
  }

  render() {
    const $children = this.getChildrenByIsLoading();

    const $target = createElement(h("section", { class: "main--section" }, $children));

    if (!this.$target) {
      this.$target = $target;
    } else {
      this.reRender($target);
    }
  }
}

export default HistoryListSection;
