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

const HISTORY_LIST_INITIAL_STATE = {
  isLoading: true,
  totalLength: 0,
  historyList: [],
};

export { HISTORY_INITIAL_STATE, HISTORY_LIST_INITIAL_STATE };
