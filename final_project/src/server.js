// Variants:
// function isEmpty() that will recieve folder path as a parameter and check if folder is empty

const express = require("express");
const cors = require("cors");
const app = express();
const router = express.Router();
const cookieParser = require("cookie-parser");
require("dotenv").config();

// using json middleware
app.use(express.json());
// for cross origin policy (CORS)
app.use(cors());
// cookie-parser middleware to store cookies on client side
app.use(cookieParser());
// importing routes
const userRoutes = require("./routes/user");
const dataRoutes = require("./routes/data");
app.use("/api/v1", userRoutes);
app.use("/api/v1", dataRoutes);

router.get("/", (req, res, next) => {
  res.send("hello express");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`app is listening on: localhost:${port}`);
});
module.exports = app;
