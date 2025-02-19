const test = require("node:test");
const assert = require("node:assert");

const numChecker = (array) => {
  return array.some((item) => {
    return typeof item !== "number";
  });
};

function calculateSum(numbers) {
  if (numbers.length < 2) {
    return "Provide an array with minimum 2 element!";
  } else if (numChecker(numbers)) {
    return "Provide Number values only!";
  } else {
    return numbers.reduce((total, a, b) => {
      return (total += a + b);
    });
  }
}
// if you provide an array with different types of data except number you'll get an exception
const testArray = [10, 37, 50, 70, 15, 24, 77, "feria"];

// test checks if result of the function is number
test.test("Function executes successfully", () => {
  console.log(calculateSum(testArray));
});
// this test checks if function trows an exception in case it gets a string values instead of number
test.test("Function handles NaN cases", () => {
  assert.strictEqual(typeof calculateSum(testArray), "string");
});
// this test checks if nuChecker works fine return value must be a boolean
test.test("Function numChecker works fine", () => {
  assert.doesNotThrow(() => {
    numChecker(testArray);
  });
});
