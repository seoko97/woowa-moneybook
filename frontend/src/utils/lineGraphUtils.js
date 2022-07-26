import { MONTH_UNIT } from "../constants/lineGraph";

// 6개월치 데이터에 존재하는 달이 6개 미만인 경우 6개로 만들어주는 함수
const makeFullDataArray = ({ data, month: curMonth }) => {
  if (data.length === 6) return data;
  const month2idx = {};
  let idx = 0;
  const ret = Array.from({ length: MONTH_UNIT }, (_, i) => {
    let month = curMonth - i;
    if (month <= 0) month += 12;
    month2idx[month] = idx;
    return { month, total: 0 };
  });
  data.forEach(({ month, total }) => (ret[month2idx[month]] = total));
  return ret;
};

export { makeFullDataArray };
