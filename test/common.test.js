const { makeProgress } = require("../lib/progress");

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
  expect(test()).toBe("Progress: |█████████████████████████-------------------------| 50.00% Complete");
});