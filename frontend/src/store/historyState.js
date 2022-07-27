import { initState } from "../core/store";
import { HISTORY_INITIAL_STATE, HISTORY_LIST_INITIAL_STATE } from "../constants/history";

const historyState = initState({
  key: "historyState",
  defaultValue: HISTORY_INITIAL_STATE,
});

const historyListState = initState({
  key: "historyListState",
  defaultValue: HISTORY_LIST_INITIAL_STATE,
});

export { historyState, historyListState };
