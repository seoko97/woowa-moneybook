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

const ANALYTICS_TRX_LIST_INITIAL_STATE = {
  analyticsTrxList: [
    {
      id: 1198,
      trxDate: "2022-07-27",
      direction: "out",
      category: "생활",
      description: "asdasdasdasdasdasdasdasd",
      payment: "국민카드",
      amount: 123132333,
    },
    {
      id: 1205,
      trxDate: "2022-07-27",
      direction: "out",
      category: "생활",
      description: "asdasd",
      payment: "국민카드",
      amount: 123123123,
    },
    {
      id: 1204,
      trxDate: "2022-07-27",
      direction: "out",
      category: "생활",
      description: "asdasd",
      payment: "국민카드",
      amount: 123123123,
    },
    {
      id: 1202,
      trxDate: "2022-07-27",
      direction: "out",
      category: "생활",
      description: "asdasd",
      payment: "국민카드",
      amount: 123123,
    },
    {
      id: 1200,
      trxDate: "2022-07-27",
      direction: "out",
      category: "생활",
      description: "asdasd",
      payment: "국민카드",
      amount: 123123,
    },
    {
      id: 1199,
      trxDate: "2022-07-27",
      direction: "out",
      category: "생활",
      description: "asdasd1qweqweqwe",
      payment: "국민카드",
      amount: 1234,
    },
    {
      id: 1192,
      trxDate: "2022-07-27",
      direction: "out",
      category: "생활",
      description: "asd",
      payment: "국민카드",
      amount: 123,
    },
    {
      id: 1189,
      trxDate: "2022-07-27",
      direction: "out",
      category: "생활",
      description: "프로젝트 회의",
      payment: "나라사랑카드",
      amount: 123123123,
    },
    {
      id: 1190,
      trxDate: "2022-07-26",
      direction: "out",
      category: "생활",
      description: "지석호",
      payment: "테스트",
      amount: 123123123,
    },
  ],
};

export {
  ANALYTICS_INITIAL_STATE,
  ANALYTICS_RANKING_INITIAL_STATE,
  ANALYTICS_TRX_LIST_INITIAL_STATE,
};
