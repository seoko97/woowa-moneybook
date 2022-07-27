import { initState } from "../core/store";
import { ANALYTICS_INITIAL_STATE, ANALYTICS_RANKING_INITIAL_STATE } from "../constants/analytics";

const analyticsState = initState({
  key: "analyticsState",
  defaultValue: ANALYTICS_INITIAL_STATE,
});

const analyticsRankingState = initState({
  key: "analyticsRankingListState",
  defaultValue: ANALYTICS_RANKING_INITIAL_STATE,
});

export { analyticsState, analyticsRankingState };
