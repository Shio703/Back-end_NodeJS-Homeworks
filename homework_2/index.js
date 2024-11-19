import fs from "node:fs";
// Target file path on global scope to be accessible easily
let filePath = "./sayings.json";

// ++++++++++++++++++++++++++++++++++++++++++++++++
// First Task: Reading the file and listening to it
// ++++++++++++++++++++++++++++++++++++++++++++++++

const readableStream = fs.createReadStream(filePath, "utf-8");

readableStream.on("data", (data) => {
  console.log("Reading the data...");
  console.log(data);
});

readableStream.on("end", () => {
  console.log("Reading finished.");
});

// +++++++++++++++++++++++++++++++++++++++++++++++++
// Second Task: Checking the size of the file
// +++++++++++++++++++++++++++++++++++++++++++++++++

const sizeChecker = (filePath) => {
  fs.lstat(filePath, (err, stats) => {
    if (err) {
      console.log(err);
      return;
    } else {
      console.log("File size is:", stats.size, "Bytes");
    }
  });
};

sizeChecker(filePath);

// +++++++++++++++++++++++++++++++++++++++++++++++++++
// Third Task: Modifing Buffer using indexing
// +++++++++++++++++++++++++++++++++++++++++++++++++++

const text = "I'm  learning NodeJS and node:fs module.";
let myBuff = Buffer.alloc(256, text);

let targetIndex = myBuff.toString().indexOf("'m");

myBuff.write(" love", targetIndex);

console.log(myBuff.toString());

// ===================================================
// Fourth Task: creating a promise
// ===================================================

let results = [];
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const numChecker = (max) => {
      const num = Math.floor(Math.random() * max);
      if (num % 2 === 0) {
        resolve({ num, status: "Number is even" });
      } else {
        reject({ num, status: "Number is odd" });
      }
    };
    // pass highest number to check "numChecker" function for.ex: 100
    numChecker(100);
  }, 2000);
});

// second promise
const secPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(100);
  }, 1000);
})
  .then((hundred) => hundred)
  .catch((hundred) => results.push(hundred));
// pushing the result in the array
try {
  await myPromise.then((message) => {
    console.log(message.num, message.status);
    // pushing the result in the array
    results.push(message.num);
  });
} catch (err) {
  if (err.status === "Number is odd") {
    console.log(err.num, err.status);
    // pushing the result in the array
    results.push(err.num);
  } else {
    // displaying another kind of errors
    console.log(err);
  }
}
console.log(results);

console.log("Finally finished!");