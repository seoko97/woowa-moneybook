import { RADIUS } from "../constants/doughnutChart";

const getCoordinatesForPercent = (percent) => {
  const x = RADIUS * Math.cos(2 * Math.PI * percent);
  const y = RADIUS * Math.sin(2 * Math.PI * percent);
  return [x, y];
};

const getCategoryDataPath = ({ startX, startY, endX, endY, isLargeArcFlag }) => {
  return `M ${startX} ${startY} A ${RADIUS} ${RADIUS} 0 ${isLargeArcFlag} 1 ${endX} ${endY} L 0 0`;
};

const getTotalAmount = (data) => {
  return data.reduce((total, { amount }) => total + amount, 0);
};

const getTotalPercent = (data) => {
  const total = getTotalAmount(data);
  return data.map(({ amount }) => amount / total);
};

const getDoughnutChartPaths = (totalPercent) => {
  let accumulatedPercent = 0;
  return totalPercent.map((percent) => {
    const [startX, startY] = getCoordinatesForPercent(accumulatedPercent, RADIUS);
    accumulatedPercent += percent;
    const [endX, endY] = getCoordinatesForPercent(accumulatedPercent, RADIUS);
    const isLargeArcFlag = percent > 0.5 ? 1 : 0;

    return getCategoryDataPath({ startX, startY, endX, endY, isLargeArcFlag });
  });
};

export { getDoughnutChartPaths, getTotalPercent };
