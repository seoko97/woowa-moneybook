import { initState } from "../core/store";
import { dateHandler } from "../utils/dateHandler";

const HISTOTY_INITSTATE = {
  id: null,
  description: "",
  trxDate: dateHandler(new Date()),
  direction: "out",
  category: "",
  payment: null,
  amount: 0,
};

export const historyState = initState({
  key: "historyState",
  defaultValue: HISTOTY_INITSTATE,
});
