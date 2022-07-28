const ANALYTICS_INITIAL_STATE = {
  selectedCategory: null,
  selectedYear: null,
  selectedMonth: null,
};

const ANALYTICS_RANKING_INITIAL_STATE = {
  isLoading: true,
  analyticsList: [],
};

const ANALYTICS_TRX_LIST_INITIAL_STATE = {
  sum: {},
  analyticsTrxList: {},
};

export {
  ANALYTICS_INITIAL_STATE,
  ANALYTICS_RANKING_INITIAL_STATE,
  ANALYTICS_TRX_LIST_INITIAL_STATE,
};
