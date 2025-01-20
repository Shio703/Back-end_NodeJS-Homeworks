const fs = require("node:fs");
const path = require("node:path");
const { spawn } = require("node:child_process");
const multer = require("multer");

// multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const storagePath = path.join(
      __dirname,
      "../",
      `usersData/${"shio703"}/data`
    );
    if (!storagePath) {
      return "error storage path not found!";
    }
    console.log("File Location:", storagePath.slice(54));
    // username is undefined
    console.log(req.body.username);
    cb(null, storagePath);
  },
  filename: function (req, file, cb) {
    const fileName = Date.now() + "-" + file.originalname;
    cb(null, fileName);
  },
  metadata: function (req, file, cb) {
    const customMetaData = {
      customName: req.customName || null,
      uploadedBy: req.body.username || "Nobody",
      uploadDate: new Date(),
      description: req.body.description,
    };
    // this is not even logging
    console.log("uploaded by:", customMetaData.uploadedBy);
    file.customMetaData = customMetaData;
    cb(null, customMetaData);
  },
});
const upload = multer({ storage: storage });

// listData function for listing user's directory:
const listData = (username) => {
  if (!username) {
    return "Provided username doesn't exists!";
  }
  return new Promise((resolve, reject) => {
    try {
      const dirPath = path.join(__dirname, "..", `/usersData/${username}/data`);
      console.log(dirPath);
      // if you are on linux/mac you can change "dir" with ls and "/s" argument
      const ls = spawn(`dir ${dirPath}`, ["/s"], { cwd: dirPath, shell: true });

      let result = [];

      ls.stdout.on("data", (data) => {
        result.push(data.toString());
      });
      ls.stderr.on("data", (error) => {
        reject("stderr:", error.toString());
      });
      ls.on("error", (err) => {
        if (err.code === "ENOENT") {
          // Disclaimer: there might be trown same error if you provide wrong command in spawn so think twice if you changed the command
          reject({ message: `User ${username} not found`, code: 404 });
        } else {
          reject(err);
        }
      });
      ls.on("close", () => {
        resolve(result);
      });
    } catch (error) {
      console.log(error);
    }
  });
};

// for creating a new folder in user's 'data' directory
const createFolder = (username, folderName) => {
  if (!username) {
    return "Provide valid username!";
  }
  return new Promise((resolve, reject) => {
    try {
      const dirPath = path.join(__dirname, "..", `/usersData/${username}/data`);
      const newFolderPath = path.join(dirPath, folderName);
      fs.mkdir(newFolderPath, (err) => {
        if (err) {
          if (err.code === "EEXIST") {
            reject("Folder already exists!");
          } else if (err.code === "ENOENT") {
            reject("Provided username doesn't exists!");
          }
          reject(err);
        } else {
          resolve("Folder created successfully!");
        }
      });
    } catch (error) {
      console.log(error);
    }
  });
};

// function for checking if folder is empty and also checks if it's present
const isEmpty = (path) => {
  try {
    return fs.readdirSync(path, { withFileTypes: true }).length === 0;
  } catch (err) {
    if (err.code === "ENOENT") {
      return "Folder doesn't exists!";
    } else if (err.code === "ENOTDIR") {
      return "Target with provided name isn't folder!";
    } else {
      console.log("Error in isEmpty()", err);
    }
  }
};

// for deleting folder in user's 'data' directory
const deleteFolder = (username, folderName) => {
  if (!username) {
    return "Provide valid username!";
  }
  return new Promise((resolve, reject) => {
    try {
      const dirPath = path.join(__dirname, "..", `/usersData/${username}/data`);
      const folderPath = path.join(dirPath, folderName);

      const isEmptyR = isEmpty(folderPath);
      typeof isEmptyR === "string" ? reject(isEmptyR) : "";
      if (isEmptyR) {
        fs.rm(folderPath, { recursive: true }, (err) => {
          if (err) {
            reject("Error During deletion of the folder", err);
          } else {
            resolve("Folder deleted successfully!");
          }
        });
      } else {
        reject({ message: "Folder is not empty!", code: 403 });
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  listData,
  createFolder,
  deleteFolder,
  upload,
};
