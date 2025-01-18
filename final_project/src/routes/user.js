const express = require("express");
const router = express.Router();
const {
  register,
  validator,
  login,
  verifyToken,
} = require("../utils/userUtils");
const { listData, createFolder, deleteFolder } = require("../utils/dataUtils");

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
          maxAge: 60 * 5000,
          secure: true,
        });
        res.json({ message: "logged in" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

// Folder management endpoints:
router.post("/user/space", verifyToken, (req, res) => {
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

router.put("/user/space/create", verifyToken, (req, res) => {
  createFolder(req.body.username, req.body.foldername)
    .then((data) => {
      res.json({ message: data });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

router.delete("/user/space/file", verifyToken, (req, res) => {
  deleteFolder(req.body.username, req.body.foldername)
    .then((data) => {
      res.json({ message: data });
    })
    .catch((err) => {
      err.code === 403
        ? res.status(403).json(err)
        : res.status(500).json({ message: err });
    });
});

module.exports = router;
