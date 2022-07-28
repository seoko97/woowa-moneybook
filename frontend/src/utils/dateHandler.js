import { WEEKDAY } from "../constants/date";
import { getSumByDirection } from "./getSumByDirection";

const checkDate = (date) => (date >= 10 ? date : `0${date}`);

const changeDateByString = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${checkDate(month)}-${checkDate(day)}`;
};

const parsingStringDate = (date) => {
  const newData = date.split("-");

  return `${parseInt(newData[1])}월 ${parseInt(newData[2])}일`;
};

const changeParsedDateByYM = (parsedDate) => {
  const date = new Date(parsedDate);

  return { year: date.getFullYear(), month: date.getMonth() + 1 };
};

const getWeekDay = (date) => {
  const dateTime = new Date(date);
  return WEEKDAY[dateTime.getDay()];
};

const mappingHistoryByDate = (list) => {
  const baseObj = {
    trxDate: "",
    trxList: [],
  };

  return list.reduce((acc, item, i) => {
    const { trxDate } = item;
    if (!baseObj.trxDate || baseObj.trxDate !== trxDate) {
      if (baseObj.trxDate) acc.push({ ...baseObj });
      baseObj.trxDate = trxDate;
      baseObj.trxList = [];
    }
    baseObj.trxList.push(item);

    if (list.length - 1 === i) acc.push({ ...baseObj });

    return acc;
  }, []);
};

const changeDate = ({ month, year }) => {
  if (month > 12) {
    month = 1;
    year += 1;
  } else if (month < 1) {
    month = 12;
    year -= 1;
  }

  return { month, year };
};

// 'YYYY-MM-DD' 형태의 문자열을 YYYY, MM 으로 만들어주는 함수
const getYearMonthFromStr = (date) => {
  const [year, month] = date.split("-").map((v) => Number(v));
  return [year, month];
};

const makeYearMonthToStr = (year, month) => {
  return `${year}-${String(month).padStart(2, "0")}`;
};

const groupByMonth = (data) => {
  const mappedData = mappingHistoryByDate(data);
  const sum = [];
  const tmpList = {};
  mappedData.forEach(({ trxDate, trxList }) => {
    const [year, month] = getYearMonthFromStr(trxDate);
    if (sum.length === 0 || !(sum.at(-1).year === year && sum.at(-1).month === month)) {
      sum.push({ year, month, total: 0 });
    }
    sum.at(-1).total += getSumByDirection(trxList).sum_out;
    const yearMonStr = makeYearMonthToStr(year, month);
    if (!tmpList[yearMonStr]) {
      tmpList[yearMonStr] = [];
    }
    tmpList[yearMonStr].push(...trxList.reverse());
  });
  const analyticsTrxList = {};
  Object.entries(tmpList).forEach(([key, val]) => {
    analyticsTrxList[key] = val;
  });
  return [sum, analyticsTrxList];
};

export {
  changeDate,
  changeDateByString,
  getWeekDay,
  mappingHistoryByDate,
  parsingStringDate,
  changeParsedDateByYM,
  groupByMonth,
  makeYearMonthToStr,
};
