// CommonJS Syntax import statement
// const asciiArt = require("ascii-art");
// ECMA Script Modules Syntax
import asciiArt from "ascii-art";
import fs from "node:fs";

// ====================================================================
// First Task
// ====================================================================

// here we are using an external package "ascii-art" to draw some text

asciiArt.font("Hello NodeJS!", "doom", (err, rendered) => {
  if (err) {
    console.log(err);
  } else {
    console.log(rendered);
    console.log("Rendered Successfully:)");
  }
});
// i don't know why but my text is displayng only when err = true
//  i'm assuming it's internal bag of ascii-art package

// ====================================================================
// Second Task
// ====================================================================

// here we are bothering node.js's single thread to work hard and
// first of all read our data and only then continue it's journey
// in this file
const data = fs.readFileSync("./sayings.json", "utf8");
console.log(data);

// Reading the data from "sayings.json" asyncroniusly to don't bother
//  our single threaded node.js :)
fs.readFile("./sayings.json", "utf-8", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
});

// =======================================================================
// Third task
// =======================================================================

// Reading the data using Readable Stream and then writing it into a txt file
const readableStream = fs.createReadStream("./sayings.json", {
  encoding: "utf-8",
});

const writableStream = fs.createWriteStream("./output.txt");

readableStream.on("data", (data) => {
  console.log("File Content:", data);
  console.log("Writing into the file...");
  writableStream.write(data);
});
