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

// optimized function with memoization:
// memoization is roughly to say a caching process it means,
// that we are storing previous results in the array and by this
// way in computer memory (RAM).
// if value for calculating is the same which answer is already known
// we don't even need to run our slow function.
// but i think this approach is not useful
// unless you are going to call the same function multiple times in one loop.
const prevValues = [];

console.time("with Memoization it takes");
function optimizedWithMemo(n) {
  if (prevValues[n] != null) {
    return prevValues[n];
  }
  let sum = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      sum += i + j;
    }
  }
  prevValues[n] = sum;
  return sum;
}
console.log("OptimizedWithMemo Result:", optimizedWithMemo(10000));
// in this case it won't take triple the time that is needed for one calculation.
// there is no improvement in time if you do not call the function at least twice.

optimizedWithMemo(10000);
// optimizedWithMemo(10000);
// optimizedWithMemo(10000);
console.timeEnd("with Memoization it takes");

test("three function output matches", () => {
  assert.strictEqual(slowFunction(10000), optimized(10000));
  assert.strictEqual(optimized(10000), optimizedWithMemo(10000));
});
