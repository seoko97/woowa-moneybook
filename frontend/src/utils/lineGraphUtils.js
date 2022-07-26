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

const makeBoundary = ({ data, gapUnit = 5 }) => {
  let max = -1,
    min = Infinity;
  data.forEach(({ total }) => {
    if (max < total) max = total;
    if (total < min) min = total;
  });
  let lowerBoundary = 0;
  let upperBoundary = 0;
  let gap = (max - min) / (gapUnit - 2);
  const diff = max - min;
  // 최소값이 0 인경우 -> 가장 밑의 선을 0으로
  if (min === 0) {
    upperBoundary = max + gap;
    return [lowerBoundary, Math.max(upperBoundary, 10000)];
  }
  // 차이가 있는 경우 min을 밑에서 1번째, max를 위에서 1번째로
  else if (diff !== 0) {
    lowerBoundary = min - gap;
    if (lowerBoundary < 0) lowerBoundary = min - lowerBoundary / 100;
    upperBoundary = max + gap;
    return [lowerBoundary, upperBoundary];
  }
  // 차이가 없는 경우 값을 가운데로
  else {
    return [min - 10000, min + 10000];
  }
};

const getCoordinates = ({ data, lowerBoundary, upperBoundary, viewBoxWidth, viewBoxHeight }) => {
  return data.map(({ total }, i) => {
    const x = viewBoxWidth * (i / (data.length - 1));
    const y =
      viewBoxHeight - ((total - lowerBoundary) / (upperBoundary - lowerBoundary)) * viewBoxHeight;
    return [x, y];
  });
};

export { makeFullDataArray, makeBoundary, getCoordinates };
