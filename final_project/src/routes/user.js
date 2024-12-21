const express = require("express");
const router = express.Router();
const { register, validator } = require("../utils/userUtils");
const { listData } = require("../utils/dataUtils");

// User management endpoints:
router.post("/user/create", (req, res, next) => {
  console.log("user req: ", req.body);
  const { username, password } = req.body;
  const regResult = register(username, password);

  res.json({ message: regResult });
});
router.get("/user/validate", (req, res, next) => {
  const validatorResult = validator(req.body.username);
  validatorResult.code === 404
    ? res.status(404).json(validatorResult)
    : res.json(validatorResult);
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
      err.code === 404
        ? res.status(404).json(err)
        : res.status(500).json({ error: err });
    });
});
router.put("/user/space/create", (req, res) => {});
router.delete("/user/space/file", (req, res) => {});

module.exports = router;
