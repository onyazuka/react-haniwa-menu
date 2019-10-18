function linear(timeFraction) {
  return timeFraction;
}

function quad(timeFraction) {
  return Math.pow(timeFraction, 2);
}

function circ(timeFraction) {
  return 1 - Math.sin(Math.acos(timeFraction));
}

function back(x, timeFraction) {
  return Math.pow(timeFraction, 2) * ((x + 1) * timeFraction - x);
}

function elastic(x, timeFraction) {
  return Math.pow(2, 10 * (timeFraction - 1)) * Math.cos(20 * Math.PI * x / 3 * timeFraction);
}

function makeEaseOut(timing) {
  return function (timeFraction) {
    return 1 - timing(1 - timeFraction);
  };
}

function makeEaseInOut(timing) {
  return function (timeFraction) {
    if (timeFraction < .5) return timing(2 * timeFraction) / 2;else return (2 - timing(2 * (1 - timeFraction))) / 2;
  };
}

export default {
  linear,
  quad,
  circ,
  back,
  elastic,
  makeEaseOut,
  makeEaseInOut
};