import { initState } from "../core/store";
import { ANALYTICS_INITIAL_STATE, ANALYTICS_LIST_INITIAL_STATE } from "../constants/analytics";

const analyticsState = initState({
  key: "analyticsState",
  defaultValue: ANALYTICS_INITIAL_STATE,
});

const analyticsListState = initState({
  key: "analyticsListState",
  defaultValue: ANALYTICS_LIST_INITIAL_STATE,
});

export { analyticsState, analyticsListState };
