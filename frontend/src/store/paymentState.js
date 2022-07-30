import { initState } from "../core/store";

const paymentListState = initState({
  key: "paymentListState",
  defaultValue: [],
});

export { paymentListState };
