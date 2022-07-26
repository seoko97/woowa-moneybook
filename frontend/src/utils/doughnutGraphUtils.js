import { RADIUS } from "../constants/doughnutChart";

const getCoordinatesForPercent = (percent) => {
  const x = RADIUS * Math.cos(2 * Math.PI * percent);
  const y = RADIUS * Math.sin(2 * Math.PI * percent);
  return [x, y];
};
