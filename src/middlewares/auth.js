const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("Please login!")
    }

    const decodeObj = await jwt.verify(token, "DEVPROJECT");

    const { _id } = decodeObj;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }

    req.user=user;
    next();
  } catch (err) {
    res.status(400).send("ERROR:- " + err.message);
  }
};

// const userAuth = (req, res, next) => {
//   console.log("User auth is getting checked");
//   const token = "sdf";
//   const isAuthorized = token === "sdfbhbh";
//   if (!isAuthorized) {
//     res.status(401).send("The user is not authorized");
//   } else {
//     next();
//   }
// };




module.exports = {
  userAuth,
};
