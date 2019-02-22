const { isNumber } = require("util");

/**
 * 
 * @param {number} s origin number
 * @param {number} n the number of keep decimals
 */
function format(s, n) {
  if (!isNumber(s)) {
    throw TypeError("s is not a number");
  }
  if (!isNumber(n)) {
    throw TypeError("n is not a number");
  }
  const strS = String(s);
  const isDecimal = strS.includes(".");

  const decimalsLength = isDecimal
    ? strS.split(".")[1].length
    : 0;

  return (() => {
    const difference = decimalsLength - n;
    if (difference > 0) {
      return strS.substr(0, strS.length - (difference));
    }

    const addonZero = "0".repeat(Math.abs(difference));

    return strS + (isDecimal ?  addonZero : "." + addonZero);
  })();
}

module.exports = format;
