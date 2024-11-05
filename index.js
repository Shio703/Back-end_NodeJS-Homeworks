// CommonJS Syntax import statement
// const asciiArt = require("ascii-art");
// ECMA Script Modules Syntax
import asciiArt from "ascii-art";

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

