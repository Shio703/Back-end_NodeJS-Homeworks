const express = require("express");
const router = express.Router();
const fs = require("node:fs");
const path = require("node:path");

const register = (username, password) => {
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
  } catch (error) {
    if (error.code === "EEXIST") {
      return "User already exists!";
    } else {
      console.log(`Error in register() function: ${error}`);
    }
  }
};

router.post("/user/create", (req, res, next) => {
  console.log("user req: ", req.body);
  const { username, password } = req.body;
  const regResult = register(username, password);

  if (regResult === "User already exists!") {
    res.json({ message: "User already exists!" });
  } else {
    res.json({ message: `Welcome ${username}! you registered successfully;)` });
  }
  // TODO: use child process (probably fork) to create json files with user data
});
router.get("/user/validate", (req, res, next) => {
  res.send("TODO: User Validation");
});
router.get("/user/login", (req, res, next) => {
  res.send("TODO: User login");
});

module.exports = router;
