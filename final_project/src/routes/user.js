const express = require("express");
const { spawn } = require("node:child_process");
const router = express.Router();
const fs = require("node:fs");
const path = require("node:path");

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
  const user = {
    username,
    password,
  };
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
// User management endpoints:
router.post("/user/create", (req, res, next) => {
  console.log("user req: ", req.body);
  const { username, password } = req.body;
  const regResult = register(username, password);

  res.json({ message: regResult });
});
router.get("/user/validate", (req, res, next) => {
  res.send("TODO: User Validation");
});
router.get("/user/login", (req, res, next) => {
  res.send("TODO: User login");
});

const listData = async (username) => {
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
      // TODO: Handle case when user's data path can't be found
      ls.stderr.on("data", (error) => {
        reject(`stderr: ${error}`);
      });
      ls.on("error", (err) => {
        reject(err);
      });
      ls.on("close", () => {
        resolve(result);
      });
    } catch (error) {
      if (error.code === "ENOENT") {
        reject("User not found");
      } else {
        reject(error);
      }
    }
  });
};

// Folder management endpoints:
router.get("/user/space", (req, res) => {
  const username = req.body.username;
  // function needs username as a parameter
  listData(username).then((data) => {
    res.json(data);
  });
});
router.put("/user/space/create", (req, res) => {});
router.delete("/user/space/file", (req, res) => {});

module.exports = router;
