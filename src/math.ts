export const operations = {
  add: function (a: number, b: number) {
    return a + b;
  },
  multiply: function (a: number, b: number) {
    return a * b;
  },
  subtract: function (a: number, b: number) {
    return a - b;
  },
  divide: function (a: number, b: number) {
    return a / b;
  }
};

export function precisionRound(number: number, precision = 2): number {
  const factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}
