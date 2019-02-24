const format = require("./format");
const Reporter = require("./base_repoter");

const stdout = new Reporter(process);

function validateParam(total, length, decimals, iteration, caculatedPercent) {
  if (total < 0) {
    throw Error("total must be a positive number");
  }
  if (caculatedPercent < 0) {
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
 * @iteration {number} // current iteration
 * @total {number} optional // total iteration
 * @prefix {string} optional // prefix string
 * @suffix {string} optional // suffix string
 * @caculatedPercent {number} optional // give bar progress
 * @length {number} optional // character length of bar
 * @fill {string} optional // bar fill character
 * @decimals {number} optional // number of keep decimals
 * 
 * @return {number}
 */
function makeProgress({
  iteration,
  total = 50,
  fill = "█",
  length = 50,
  decimals = 2,
  caculatedPercent,
  prefix = "Progress",
  suffix = "Complete",
}) {
  validateParam(total, length, decimals, iteration, caculatedPercent);
  const percent = caculatedPercent || iteration / total;
  if (percent > 1) {
    return 1;
  }
  const printedPercent = format(percent * 100, decimals);
  const filledLength = (length * percent) | 0;  // parseInt(num, 10)
  const bar = fill.repeat(filledLength) + "-".repeat(length - filledLength);
  return render(`\r${prefix}: |${bar}| ${printedPercent}% ${suffix}`, percent);
}

function render(msg) {
  stdout.write(msg);
  stdout.clearLine();
  stdout.cursorTo();
  return 0;
}

module.exports.makeProgress = makeProgress;
module.exports.render = render;
module.exports.progress = function(options) {
  render(makeProgress(options));
};
