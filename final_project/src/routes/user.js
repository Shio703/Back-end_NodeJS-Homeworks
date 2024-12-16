const express = require("express");
const router = express.Router();

router.post("/user/create", (req, res, next) => {
  console.log(req.body);
  const username = req.body.username;

  res.send(`Welcome ${username}`);
});
router.get("/user/validate", (req, res, next) => {
  res.send("TODO: User Validation");
});
router.get("/user/login", (req, res, next) => {
  res.send("TODO: User login");
});

module.exports = router;
