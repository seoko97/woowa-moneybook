import { WEEKDAY } from "../constants/date";

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

export {
  changeDate,
  changeDateByString,
  getWeekDay,
  mappingHistoryByDate,
  parsingStringDate,
  changeParsedDateByYM,
};
