// Variants:
// function isEmpty() that will recieve folder path as a parameter and check if folder is empty

const express = require("express");
const cors = require("cors");
const app = express();
const router = express.Router();
// using json middleware
app.use(express.json());
// for cross origin policy (CORS)
app.use(cors());
// importing routes
const userRoutes = require("./routes/user");

app.use("/api/v1", userRoutes);

router.get("/", (req, res, next) => {
  res.send("hello express");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`app is listening on: localhost:${port}`);
});
module.exports = app;
