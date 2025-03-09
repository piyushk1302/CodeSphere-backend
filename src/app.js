const express = require("express");
const connectDB = require("./config/database");
// const validator = require("validator");
// already used in utils and middlewares
const app = express();
const cors = require("cors");

const cookiesParser = require("cookie-parser");
// const jwt = require("jsonwebtoken");

app.use(
  cors({
    origin: "http://localhost:5175",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookiesParser());

const authRouter = require("./routes/auth.js");
const profileRouter = require("./routes/profile.js");
const requestRouter = require("./routes/request.js");
const userRouter = require("./routes/user.js");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

//app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

connectDB()
  .then(() => {
    console.log("Database connection established");
    app.listen(5000, () => {
      console.log("server is listening on port 5000");
    });
  })
  .catch((err) => {
    console.error("error occured:", err);
  });
