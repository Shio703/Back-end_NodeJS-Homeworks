import express from "express";
import { spawn } from "node:child_process";
import { createWriteStream, readFile, existsSync } from "node:fs";
import multer from "multer";

const myApp = express();
const port = 3000;
const outputName = "output.json";

// configuring multer middleware and it's storage
const storage = multer.diskStorage({
  destination: function (req, file, cd) {
    cd(null, "./uploads");
  },
  filename: function (req, file, cd) {
    // to prevent overwritting due to name duplication adding current date to the file name
    cd(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

const getFiles = () => {
  const result = createWriteStream(outputName);

  let array = [];

  const ls = spawn("dir", ["/s"], { shell: true, cwd: "./" });
  ls.stdout.on("data", async (data) => {
    const toString = await data.toString();
    array.push(toString);
  });
  ls.on("close", (code) => {
    if (code === 0) {
      const combined = array.join("");
      const toJson = JSON.stringify(combined.split("\r\n"));
      result.write(toJson);
      console.log(toJson);
    } else {
      console.log("Errod Code:", code);
    }
    result.close();

    console.log("writing the list finished!");
  });
  return new Promise(async (resolve, reject) => {
    if (existsSync(`./${outputName}`)) {
      readFile(`./${outputName}`, { encoding: "utf-8" }, (err, data) => {
        err ? reject(err) : resolve(data);
      });
    } else {
      `file ${outputName} doesn't exists!`;
    }
  });
};
// Main endpoint
myApp.get("/", (req, res) => {
  res.send("Hello from main page");
});

// Public Subfolder endpoint for fetching public data
myApp.get("/public/*", (req, res) => {
  const path = req.path.replace("/public", "");
  console.log(`Request recieved on: ${req.path}`);

  res.sendFile(path, { root: "./public" }, (err) => {
    err
      ? res
          .status(err.status || 500)
          .send("Either File not found or there's another error on the server")
      : "";
  });
});

// files endpoint for fetching file list of server directory
myApp.get("/files", async (req, res) => {
  try {
    const resData = await getFiles();
    res.send(`Data: ${resData}`);
  } catch (error) {
    console.log(error);
  }
});
// in order to upload files on this endpoint open "index.html" file
myApp.post("/uploads", upload.single("upload_form"), (req, res) => {
  console.log(`Request on: ${req.url}`);
  req.file
    ? res.send("File Uploaded Successfully!")
    : res.send("Provide File!");
  console.log(req.file);
});

myApp.listen(port, () => {
  console.log(`express app listening on ${port}`);
});
