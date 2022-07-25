import { initState } from "../core/store";
import { PAYMENTS } from "../dummy";

const paymentListState = initState({
  key: "paymentListState",
  defaultValue: PAYMENTS,
});

export { paymentListState };
