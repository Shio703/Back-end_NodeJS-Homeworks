const express = require("express");
const router = express.Router();
const { register, listData } = require("../utils/userUtils");

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

// Folder management endpoints:
router.get("/user/space", (req, res) => {
  const username = req.body.username;
  // function needs username as a parameter
  listData(username)
    .then((data) => {
      res.json({ data });
    })
    .catch((err) => {
      res.json({ error: err });
    });
});
router.put("/user/space/create", (req, res) => {});
router.delete("/user/space/file", (req, res) => {});

module.exports = router;
