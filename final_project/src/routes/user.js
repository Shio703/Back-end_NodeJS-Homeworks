const express = require("express");
const router = express.Router();
const { register, validator, login } = require("../utils/userUtils");
const { listData } = require("../utils/dataUtils");

// User management endpoints:
router.post("/user/create", (req, res, next) => {
  console.log("user req: ", req.body);
  const { username, password } = req.body;
  const regResult = register(username, password);

  res.json({ message: regResult });
});
router.post("/user/validate", (req, res, next) => {
  const validatorResult = validator(req.body.username);
  validatorResult.code === 404
    ? res.status(404).json(validatorResult)
    : res.json(validatorResult);
});

router.post("/user/login", (req, res, next) => {
  const { username, password } = req.body;
  login(username)
    .then((token) => {
      res.json(token);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

// Folder management endpoints:
router.post("/user/space", (req, res) => {
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
