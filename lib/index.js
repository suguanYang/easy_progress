const format = require("./format");
const util = require("util");

function validateParam(total, length, decimals, iteration) {
  if (total < 0) {
    throw Error("total must be a positive number");
  }
  if (length < 0) {
    throw Error("length must be a positive number");
  }
  if (decimals < 0) {
    throw Error("decimals must be a positive number");
  }
  if (iteration < 0) {
    throw Error("iteration must be a positive number");
  }
}

/**
 * 
 * @param {
 *  iteration: number // current iteration
 *  total: number // total iteration
 *  prefix?: string  // prefix string
 *  suffix?: string // suffix string
 *  length?: number // character length of bar
 *  fill?: string // bar fill character
 *  decimals?: number // number of keep decimals
 * } options 
 */
function progress({
  fill = "█",
  total,
  prefix = "Progress",
  suffix = "Complete",
  length = 50,
  decimals = 2,
  iteration,
}) {
  validateParam(total, length, decimals, iteration);
  const percent = iteration / total;
  const printedPercent = format(percent, decimals);
  const filledLength = (length * percent) | 0;  // parseInt(num, 10)
  const bar = fill.repeat(filledLength) + "-".repeat(length - filledLength);
  return util.format("\r%s: |%s| %s% %s\r", prefix, bar, printedPercent, suffix);
}

module.exports = progress;
