import { MONTH_UNIT } from "../constants/lineGraph";

// 6개월치 데이터에 존재하는 달이 6개 미만인 경우 6개로 만들어주는 함수
const makeFullDataArray = ({ data, month: curMonth }) => {
  if (data.length === 6) return data;
  const month2idx = {};
  let idx = 0;
  const ret = Array.from({ length: MONTH_UNIT }, (_, i) => {
    let month = curMonth - i;
    if (month <= 0) month += 12;
    month2idx[month] = idx++;
    return { month, total: 0 };
  });
  data.forEach(({ month, total }) => (ret[month2idx[month]].total = total));
  return ret;
};

const makeBoundary = ({ data, gapUnit = 5 }) => {
  let max = -1,
    min = Infinity;
  data.forEach(({ total }) => {
    if (max < total) max = total;
    if (total < min) min = total;
  });
  let lowerBoundary, upperBoundary;
  let gap = (max - min) / (gapUnit - 2);
  const diff = max - min;
  // 최소값이 0 인경우 -> 가장 밑의 선을 0으로
  if (min === 0) {
    lowerBoundary = 0;
    upperBoundary = Math.max(max + gap, 10000);
  }
  // 차이가 있는 경우 min을 밑에서 1번째, max를 위에서 1번째로
  else if (diff !== 0) {
    lowerBoundary = min - gap;
    upperBoundary = max + gap;
  }
  // 차이가 없는 경우 값을 가운데로
  else {
    lowerBoundary = min - 10000;
    upperBoundary = max + 10000;
  }
  return [lowerBoundary, upperBoundary];
};

const getCoordinates = ({ data, lowerBoundary, upperBoundary, viewBoxWidth, viewBoxHeight }) => {
  return data.map(({ total }, i) => {
    const x = viewBoxWidth * (i / (data.length - 1));
    const y =
      viewBoxHeight - ((total - lowerBoundary) / (upperBoundary - lowerBoundary)) * viewBoxHeight;
    return [x, y];
  });
};

const calcGradient = (p1, p2) => {
  return (p1[1] - p2[1]) / (p1[0] - p2[0]);
};

// 기울기에 따라 라벨 위치를 정해주는 함수
const decideLabelPos = (grad1, grad2) => {
  if (!grad1) {
    return grad2 > 0 ? "down" : "up";
  } else if (!grad2) {
    return grad1 > 0 ? "up" : "down";
  } else {
    // ㅅ 모양
    if (grad1 > 0 && grad2 < 0) return "up";
    // V 모양
    else if (grad1 < 0 && grad2 > 0) return "down";
    // -\ 모양
    else if (grad1 < 0 && grad2 < grad1) return "up";
    // \_ 모양
    else if (grad2 < 0 && grad1 < grad2) return "down";
    // _/ 모양
    else if (grad1 > 0 && grad1 < grad2) return "down";
    // /- 모양
    else return "up";
  }
};

// 가격 텍스트의 align 위치와 dy 오프셋을 구해주는 함수
const movePointsOffset = (pointsCoord, viewBoxHeight) => {
  const position = { up: "7", down: "-2" };
  const ret = [];
  let grad;
  for (let i = 0; i < pointsCoord.length; i++) {
    if (i === 0) {
      grad = calcGradient(pointsCoord[0], pointsCoord[1]);
      ret.push(["start", position[decideLabelPos(undefined, grad)]]);
    } else if (i === pointsCoord.length - 1) {
      grad = calcGradient(pointsCoord[pointsCoord.length - 2], pointsCoord[pointsCoord.length - 1]);
      ret.push(["end", position[decideLabelPos(grad, undefined)]]);
    } else {
      const grad1 = calcGradient(pointsCoord[i - 1], pointsCoord[i]);
      const grad2 = calcGradient(pointsCoord[i], pointsCoord[i + 1]);
      ret.push(["middle", position[decideLabelPos(grad1, grad2)]]);
    }
  }
  ret.forEach((_, i) => {
    if (pointsCoord[i][1] > viewBoxHeight - 8) ret[i][1] = [position["down"]];
  });
  return ret;
};

export { makeFullDataArray, makeBoundary, getCoordinates, movePointsOffset };
