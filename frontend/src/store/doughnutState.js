import { initState } from "../core/store";

export const doughnutState = initState({
  key: "doughnutState",
  defaultValue: [
    { category: "미분류", total: 1000000 },
    { category: "의료/건강", total: 400000 },
    { category: "문화/여가", total: 400000 },
    { category: "교통", total: 300000 },
    { category: "쇼핑/뷰티", total: 300000 },
    { category: "식비", total: 200000 },
    { category: "생활", total: 100000 },
  ],
});
