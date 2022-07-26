const WEEKDAY = ["일", "월", "화", "수", "목", "금", "토"];

const checkDate = (date) => (date >= 10 ? date : `0${date}`);

export const changeDateByString = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${checkDate(month)}-${checkDate(day)}`;
};

export const parsingStringDate = (date) => {
  const newData = date.split("-");

  return `${parseInt(newData[1])}월 ${parseInt(newData[2])}일`;
};

export const getWeekDay = (date) => {
  const dateTime = new Date(date);
  return WEEKDAY[dateTime.getDay()];
};

export const mappingHistoryByDate = (list) => {
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
