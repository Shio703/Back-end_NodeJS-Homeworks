import express from "express";
import { spawn } from "node:child_process";
import { createReadStream, createWriteStream } from "node:fs";

const myApp = express();
const port = 3000;
myApp.listen(port, () => {
  console.log(`express app listening on ${port}`);
});

const outputName = "output.txt";

const getFiles = async () => {
  const result = createWriteStream(outputName);
// TODO: Create another stream which read file content and then render it on a browser
  const exObj = {
    data: [result],
  };

  const ls = spawn("dir", ["/s"], { shell: true, cwd: "./" });
  ls.stdout
    .on("data", (data) => {
      result.write(data);
    })
    .pipe(process.stdout);

  ls.stderr.on("data", (data) => {
    console.log(`Error from "getFiles": ${data}`);
  });
  ls.on("close", (code) => {
    result.end();
  });
  return result;
};

myApp.get("/", (req, res) => {
  res.send("Hello from main page");
});

myApp.get("/files", async (req, res) => {
  try {
    const resData = await getFiles();

    res.send(`Data: ${resData}`);

  } catch (error) {
    console.log(error);
  }
});
