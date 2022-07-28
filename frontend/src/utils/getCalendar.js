import { checkDate } from "./dateHandler";

const getCalendar = (parsedDate) => {
  const date = new Date(parsedDate);

  const calendarYear = date.getFullYear();
  const calendarMonth = date.getMonth() + 1;

  const monthLastDate = new Date(calendarYear, calendarMonth, 0);
  const calendarMonthLastDate = monthLastDate.getDate();

  const monthStartDay = new Date(calendarYear, date.getMonth(), 1);
  const calendarMonthStartDay = monthStartDay.getDay();

  const calendarWeekCount = Math.ceil((calendarMonthStartDay + calendarMonthLastDate) / 7);

  const monthArr = [];
  let calendarDay = 0;

  for (let i = 0; i < calendarWeekCount * 7; i++) {
    const data = {
      date: null,
      _in: 0,
      _out: 0,
    };
    if (calendarMonthStartDay <= i && calendarDay < calendarMonthLastDate) {
      calendarDay++;
      data.date = `${calendarYear}-${checkDate(calendarMonth)}-${checkDate(calendarDay)}`;
    }

    monthArr.push(data);
  }

  return monthArr;
};

export { getCalendar };
