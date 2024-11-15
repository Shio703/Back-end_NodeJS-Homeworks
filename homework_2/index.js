import fs from "node:fs";
// Target file path on global scope to be accessible easily
let filePath = "./sayings.json";

// ++++++++++++++++++++++++++++++++++++++++++++++++
// First Task: Reading the file and listening to it
// ++++++++++++++++++++++++++++++++++++++++++++++++

// const readableStream = fs.createReadStream(filePath, "utf-8");

// readableStream.on("data", (data) => {
//   console.log("Reading the data...");
//   console.log(data);
// });

// readableStream.on("end", () => {
//   console.log("Reading finished.");
// });

// +++++++++++++++++++++++++++++++++++++++++++++++++
// Second Task: Checking the size of the file
// +++++++++++++++++++++++++++++++++++++++++++++++++

// const sizeChecker = (filePath) => {
//   fs.lstat(filePath, (err, stats) => {
//     if (err) {
//       console.log(err);
//       return;
//     } else {
//       console.log("File size is:", stats.size, "Bytes");
//     }
//   });
// };

// sizeChecker(filePath);

// +++++++++++++++++++++++++++++++++++++++++++++++++++
// Third Task: Modifing Buffer using indexing
// +++++++++++++++++++++++++++++++++++++++++++++++++++

const text = "I'm  learning NodeJS and node:fs module.";
let myBuff = Buffer.alloc(256, text);

let targetIndex = myBuff.toString().indexOf("'m");

myBuff.write(" love", targetIndex);

console.log(myBuff.toString());
