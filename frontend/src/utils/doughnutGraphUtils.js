import { RADIUS } from "../constants/doughnutChart";

const getCoordinatesForPercent = (percent) => {
  const x = RADIUS * Math.cos(2 * Math.PI * percent);
  const y = RADIUS * Math.sin(2 * Math.PI * percent);
  return [x, y];
};

const getCategoryDataPath = ({ startX, startY, endX, endY, isLargeArcFlag }) => {
  return `M ${startX} ${startY} A ${RADIUS} ${RADIUS} 0 ${isLargeArcFlag} 1 ${endX} ${endY} L 0 0`;
};
