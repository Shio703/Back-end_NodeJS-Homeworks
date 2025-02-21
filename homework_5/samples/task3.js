const { test } = require("node:test");
const assert = require("node:assert");

function findLargestNumber(arr) {
  if (arr.length < 2) {
    return "Provide an array with minimum 2 number!";
  } else if (arr.some((item) => typeof item !== "number")) {
    return "Provide array with numbers!";
  }

  let largest = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > largest) largest = arr[i];
  }
  return largest;
}

// const numbers = [3, 5, 1, 10, 2];
const numbers = [
  1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35,
];
const messyArray = [1, 3, 5, 7, "", 15, 17, 19, 21, 23, 25, 27, 29, 31, {}, 35];

console.log("Largest number:", findLargestNumber(numbers));

test("Function Handles empty array cases", () => {
  typeof findLargestNumber([]) === "string";
});

test("Function handles arrays with different data types", () => {
  // if my function fails in case not every item of the array is not a number it definetely trow an exception which is "string" differently from an error which is "object" in any case.
  assert.strictEqual(typeof findLargestNumber(messyArray), "string");
});
