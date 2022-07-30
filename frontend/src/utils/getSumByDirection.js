const getSumByDirection = (historyList = []) =>
  historyList.reduce(
    (acc, item) => {
      if (item.direction === "in") acc.sum_in += item.amount;
      else acc.sum_out += item.amount;
      return acc;
    },
    { sum_in: 0, sum_out: 0 }
  );

export { getSumByDirection };
