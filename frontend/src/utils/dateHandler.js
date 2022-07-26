export const dateHandler = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${checkDate(month)}-${checkDate(day)}`;
};

const checkDate = (date) => (date >= 10 ? date : `0${date}`);
