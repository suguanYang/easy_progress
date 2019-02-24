const { makeProgress } = require("../lib/progress");
const format = require("../lib/format");

test("It should keep 2 of decimals", () => {
  const test = format(1, 2);
  expect(test).toBe("1.00");
});

test("It should throw a Error", () => {
  const test = () => format(1, -2);
  expect(test).toThrowError("n must be a positive");
});

test("It should keep 10 of decimals", () => {
  const test = format(112.456456456456, 10);
  expect(test).toBe("112.4564564564");
});

test("It should throw a Error", () => {
  const test = () => makeProgress({
    iteration: -1,
  });
  expect(test).toThrowError("iteration must be a positive number");
});

test("It should return a 50% progress", () => {
  const fill = String.fromCharCode(9608);
  const test = makeProgress({
    fill,
    caculatedPercent: 0.5
  });
  expect(test).toBe("█████████████████████████------------------------- 50.00%");
});

test("It should return a 100% progress", () => {
  const fill = String.fromCharCode(9608);
  const test = makeProgress({
    fill,
    caculatedPercent: 1
  });
  expect(test).toBe("██████████████████████████████████████████████████ 100.00%\n");
});