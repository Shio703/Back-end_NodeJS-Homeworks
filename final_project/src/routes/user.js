const express = require("express");
const router = express.Router();
const { register, validator, login } = require("../utils/userUtils");

// User management endpoints:
router.post("/user/create", (req, res, next) => {
  console.log("user req: ", req.body);
  const { username, password } = req.body;
  const regResult = register(username, password);
  regResult.code === 403
    ? res.status(403).json(regResult)
    : res.json({ message: regResult });
});
router.post("/user/validate", (req, res, next) => {
  const validatorResult = validator(req.body.username);
  validatorResult.code === 404
    ? res.status(404).json(validatorResult)
    : res.json(validatorResult);
});

router.post("/user/login", (req, res, next) => {
  const { username, password } = req.body;
  login(username, password)
    .then((token) => {
      if (token.code === 401) {
        res.status(401).json({ message: token.message });
      } else {
        res.cookie("access-token", token.userToken, {
          maxAge: 60 * 15000,
          secure: true,
        });
        res.json({ message: "logged in" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
