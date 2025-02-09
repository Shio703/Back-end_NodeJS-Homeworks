const test = require("node:test");
const assert = require("node:assert");

function calculateSum(numbers) {
  if (numbers.length < 2) {
    return "Provide an array with minimum 2 element!";
  } else if (typeof numbers !== "number") {
    return "Provide Number values only!";
  }

  return numbers.reduce((a, b) => a + b);
}

const testArray = [10, 37, "v"];

// test checks if result of the function is number
test.test("Function executes successfully", () => {
  console.log(calculateSum(testArray));
});
test.test("Function handles NaN cases", () => {
  assert.strictEqual(typeof calculateSum(testArray), "string");
});
test.test(
  "Function",
  { todo: "i should think of this test case", skip: "not implemented yet!" },
  () => {}
);
