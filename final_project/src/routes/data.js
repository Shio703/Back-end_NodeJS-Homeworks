const express = require("express");
const router = express.Router();
const { verifyToken } = require("../utils/userUtils");
const {
  listData,
  createFolder,
  deleteFolder,
  upload,
} = require("../utils/dataUtils");

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

// for uploading files
router.post("/user/space/upload", upload.single("file"), (req, res) => {
  console.log(req.body.username);
  console.log(req.body.authenticated);

  res.json({ message: "it works:)" });
});

module.exports = router;
