import { MONTH_UNIT } from "./lineGraph";

const ANALYTICS_INITIAL_STATE = {
  selectedCategory: null,
  selectedYear: null,
  selectedMonth: null,
  monthUnit: MONTH_UNIT,
};

const ANALYTICS_RANKING_INITIAL_STATE = {
  isLoading: true,
  analyticsList: [],
};

export { ANALYTICS_INITIAL_STATE, ANALYTICS_RANKING_INITIAL_STATE };
