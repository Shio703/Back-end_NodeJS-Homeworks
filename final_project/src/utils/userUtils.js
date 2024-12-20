const fs = require("node:fs");
const path = require("node:path");
const { spawn } = require("node:child_process");

// User's object blueprint
class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
}

//Registration function
const register = (username, password) => {
  const maliciousArray = [
    "/",
    "${7*7}",
    "`rm -rf /`",
    "$(whoami)",
    "../etc",
    "; ls -a",
    "|| ls",
    "| cat /e",
    "&& halt",
    "; nc -e",
    "`curl.sh`",
    "passwd",
  ];
  // registration checks:
  if (!username && !password) {
    return "Provide Username & Password!";
  } else if (username.length > 12) {
    return "Username is too long! you can use up to 12 characters";
  } else {
    for (const maliciousString of maliciousArray) {
      if (username.includes(maliciousString)) {
        return "You are so malicious guy! (Provided username sucks)";
      }
    }
  }
  // if all abovementioned checks passed then execute down here:

  const user = new User(username, password);
  try {
    // user data dir path
    const userDirPath = path.join(
      __dirname,
      "..",
      `./usersData/${user.username}`
    );
    // user's json file path
    const filePath = path.join(
      __dirname,
      "..",
      `usersData/${user.username}/${user.username}.json`
    );

    // creating "userDir" with name of registered user
    fs.mkdirSync(userDirPath);
    // creating "data" directory for user uploads
    fs.mkdirSync(userDirPath.concat("/data"));

    fs.writeFileSync(filePath, JSON.stringify(user));
    return `Welcome ${user.username} you registered successfully;)`;
  } catch (error) {
    if (error.code === "EEXIST") {
      return "User already exists!";
    } else {
      console.log(`Error in register() function: ${error}`);
      return "There is a problem you couldn't registered:(";
    }
  }
};

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
          reject("User not found");
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
  register,
  listData,
};
