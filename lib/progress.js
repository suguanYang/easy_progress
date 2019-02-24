const format = require("./format");
const Reporter = require("./base_repoter");

const stdout = new Reporter(process);

function validateParam(total, length, decimals, iteration, caculatedPercent) {
  if (total < 0) {
    throw Error("total must be a positive number");
  }
  if (total < 0) {
    throw Error("length must be a positive number");
  }
  if (caculatedPercent < 0) {
    throw Error("total must be a positive number");
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
 * @iteration {number} // current iteration
 * @total {number} optional // total iteration
 * @length {number} optional // progress length
 * @prefix {string} optional // prefix string
 * @suffix {string} optional // suffix string
 * @caculatedPercent {number} optional // give bar progress
 * @fill {string} optional // bar fill character
 * @decimals {number} optional // number of keep decimals
 * @backgroud {string} optional // bar's background
 * 
 * @return {string}
 */
function makeProgress({
  iteration = 0,
  total = 50,
  fill = "█",
  length = 50,
  decimals = 2,
  background = "-",
  caculatedPercent = null,
  prefix = "",
  suffix = "",
}) {
  validateParam(total, length, decimals, iteration, caculatedPercent);
  const percent = caculatedPercent || iteration / total;
  if (percent > 1) {
    return 1;
  }
  const printedPercent = format(percent * 100, decimals);
  const filledLength = (length * percent) | 0;  // parseInt(num, 10)
  const bar = fill.repeat(filledLength) + background.repeat(length - filledLength);
  return percent === 1
    ? `${prefix}${bar} ${printedPercent}%${suffix}\n`
    : `${prefix}${bar} ${printedPercent}%${suffix}`;
}

function render(msg) {
  stdout.cursorTo(0);
  stdout.write(msg);
  stdout.clearLine(1);
  return 0;
}

exports.makeProgress = makeProgress;
exports.render = render;
exports.progress = function(options) {
  render(makeProgress(options));
};
