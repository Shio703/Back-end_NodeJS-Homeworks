const fs = require("node:fs");
const path = require("node:path");
const { spawn } = require("node:child_process");

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

module.exports = {
  listData,
};
