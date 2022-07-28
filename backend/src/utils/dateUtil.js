const getStartEndDay = (year, month) => {
  let startYear, startMonth;
  let endYear, endMonth;
  if (month === 12) {
    startMonth = 1;
    endMonth = 1;
    startYear = year;
    endYear = year + 1;
  } else {
    startMonth = month + 1;
    endMonth = month + 1;
    startYear = year - 1;
    endYear = year;
  }
  startYear = String(startYear);
  startMonth = String(startMonth);
  endYear = String(endYear);
  endMonth = String(endMonth);

  const startDay = `${startYear}-${startMonth.padStart(2, "0")}-01 00:00:00`;
  const endDay = `${endYear}-${endMonth.padStart(2, "0")}-01 00:00:00`;
  return [startDay, endDay];
};

module.exports = getStartEndDay;
