import AnalyticsIcon from "../../public/analyticsIcon.svg";
import CalendarIcon from "../../public/calendarIcon.svg";
import HistoryIcon from "../../public/historyIcon.svg";

const CATEGORY_COLORS = {
  생활: "#4a6cc3",
  식비: "#4ca1de",
  교통: "#94d3cc",
  "쇼핑/뷰티": "#4cb8b8",
  "의료/건강": "#6ed5eb",
  "문화/여가": "#d092e2",
  미분류: "#817dce",
  월급: "#b9d58c",
  용돈: "#e6d267",
  기타수입: "#e2b765",
};

const PAGE_INFO = [
  { href: "/", $icon: HistoryIcon },
  { href: "/calendar", $icon: CalendarIcon },
  { href: "/analytics", $icon: AnalyticsIcon },
];

const CATEGORY_BY_OUT = ["생활", "식비", "교통", "쇼핑/뷰티", "의료/건강", "문화/여가", "미분류"];
const CATEGORY_BY_IN = ["월급", "용돈", "기타수입"];

export { CATEGORY_COLORS, PAGE_INFO, CATEGORY_BY_IN, CATEGORY_BY_OUT };
