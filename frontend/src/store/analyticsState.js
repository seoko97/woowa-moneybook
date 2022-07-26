import { initState } from "../core/store";
import { MONTH_UNIT } from "../constants/lineGraph";

export const analyticsState = initState({
  key: "analyticsState",
  defaultValue: {
    selectedCategory: null,
    selectedYear: null,
    selectedMonth: null,
    monthUnit: MONTH_UNIT,
  },
});
