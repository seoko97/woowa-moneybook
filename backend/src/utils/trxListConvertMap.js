const trxListConvertMap = (trxList) => {
  const ret = trxList.reduce((acc, cur) => {
    if (acc.length === 0 || acc.at(-1).date !== cur.date) {
      acc.push({ date: cur.date, trxList: [] });
    }
    acc.at(-1).trxList.push(cur);
    return acc;
  }, []);
  console.log(ret);
  return ret;
};

module.exports = trxListConvertMap;
