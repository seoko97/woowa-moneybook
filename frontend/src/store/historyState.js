import { initState } from "../core/store";
import { changeDateByString } from "../utils/dateHandler";

const HISTORY_INITIAL_STATE = {
  id: null,
  description: "",
  trxDate: changeDateByString(new Date()),
  direction: "out",
  category: "",
  payment: null,
  amount: 0,
};

export const historyState = initState({
  key: "historyState",
  defaultValue: HISTORY_INITIAL_STATE,
});

export const historyListState = initState({
  key: "historyListState",
  defaultValue: {
    isLoading: false,
    historyList: [],
  },
});
