import { initState } from "../core/store";

export const doughnutState = initState({
  key: "doughnutState",
  defaultValue: {
    categoryExpenditureList: [
      { category: "미분류", amount: 1000000 },
      { category: "의료/건강", amount: 400000 },
      { category: "문화/여가", amount: 400000 },
      { category: "교통", amount: 300000 },
      { category: "쇼핑/뷰티", amount: 300000 },
      { category: "식비", amount: 200000 },
      { category: "생활", amount: 100000 },
    ],
  },
});
