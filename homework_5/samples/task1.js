const fs = require("fs");

function readFileContent(filePath) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      if (err.code === "ENOENT") {
        console.log("A file with provided name not found:(");
        return;
      }
      console.log("error occured during the operation:", err.message);
    } else {
      console.log(data);
    }
  });
}

readFileContent("nonexisting.txt");
