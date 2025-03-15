const { test } = require("node:test");
const assert = require("node:assert");

console.time("Slow function takes");
function slowFunction(n) {
  let sum = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      sum += i + j;
    }
  }
  return sum;
}
console.log("SlowFunc Result:", slowFunction(10000));
console.timeEnd("Slow function takes");

// optimized function:
console.time("Optimized takes");
function optimized(n) {
  return (n - 1) * n * n;
}

console.log("optimizedFunc Result:", optimized(10000));
console.timeEnd("Optimized takes");

test("two function output matches", () => {
  assert.strictEqual(slowFunction(10000), optimized(10000));
});
