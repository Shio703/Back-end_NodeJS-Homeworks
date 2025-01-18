const fs = require("node:fs");
const path = require("node:path");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// User's object blueprint
class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
}
let user;
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

  user = new User(username, password);
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
// for checking user's authorization info
const getUser = (username) => {
  try {
    const usersJson = path.join(
      __dirname,
      "..",
      `./usersData/${username}/${username}.json`
    );

    const json = fs.readFileSync(usersJson, { encoding: "utf-8" });
    const parsed = JSON.parse(json);
    return parsed;
  } catch (error) {
    console.log(error);
  }
};

// Login function
const login = async (username, password) => {
  // console.log(username, password);
  const user = getUser(username);

  if (user.username === username && user.password === password) {
    try {
      const userToken = await new Promise((resolve, reject) => {
        // Warning! you must change jwt secret key!!!
        jwt.sign(
          { username },
          process.env.JWT_SECRET,
          { expiresIn: "5m" },
          (err, token) => {
            if (err) {
              reject(err);
            } else {
              resolve(token);
            }
          }
        );
      });
      return { userToken };
    } catch (error) {
      console.log(`Error in login() function: ${error}`);
      return { message: "error during creation of access token" };
    }
  } else {
    return { message: "Username or Password is incorrect!", code: 401 };
  }
};

//token verifyier middleware
const verifyToken = (req, res, next) => {
  const accessToken = req.cookies["access-token"];

  if (!accessToken) {
    res.status(401).json({ message: "you are not authenticated!" });
  } else {
    try {
      const isValid = jwt.verify(accessToken, process.env.JWT_SECRET);
      isValid ? req.authenticated : "";
      return next();
    } catch (error) {
      res.status(500).json({ error });
    }
  }
};

// Function for user validation:
const validator = (username) => {
  if (!username || username === "") {
    return { message: "Provide Username" };
  }
  try {
    const userDirPath = path.join(__dirname, "..", `./usersData/${username}`);
    if (fs.existsSync(userDirPath)) {
      return { message: `User ${username} is valid` };
    } else {
      return { message: `User ${username} Not found`, code: 404 };
    }
  } catch (error) {
    return error;
  }
};

module.exports = {
  register,
  validator,
  login,
  verifyToken,
};
