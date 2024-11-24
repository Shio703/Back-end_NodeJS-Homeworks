import { exec } from "node:child_process";
import { createWriteStream } from "node:fs";
import { exit } from "node:process";

const resultarr = [];
const date = new Date().toLocaleDateString();
const time = new Date().toLocaleTimeString();
const fileName = process.argv[2];

if (!fileName) {
  console.log("Provide Output File Name! as a first argument");
  exit(1);
}

exec(
  "echo %os% && echo %username% && echo %windir% && echo %number_of_processors% && echo %computername%",
  (error, stdout, stderr) => {
    const cleanedOutput = stdout.split(/[\r\n]+/);

    error
      ? console.log(`Error Occured: ${error}`)
      : resultarr.push(cleanedOutput);
    //  WARNING! if you are a good developer please just close eyes and scroll up
    // there is a true example how to hardcode objects
    const resultObj = {
      os: resultarr[0][0],
      userName: resultarr[0][1],
      winDirectory: resultarr[0][2],
      Number_of_Processors: resultarr[0][3],
      computerName: resultarr[0][4],
      date,
      time,
    };
    const toJson = JSON.stringify(resultObj);

    //  writing the result data into a json file using writable stream
    const WritableStream = createWriteStream(`./${fileName}.json`, {
      encoding: "utf-8",
    });
    WritableStream.write(toJson);
    WritableStream.end();
    WritableStream.on("error", (err) => {
      console.log("Error During File writing:", err);
    });
    WritableStream.on("close", () => {
      console.log("File is Ready!");
    });

    console.log(resultObj);
  }
);
