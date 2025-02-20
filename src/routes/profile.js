const express = require("express");

const validator = require("validator");
const bcrypt = require("bcrypt")

const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth.js");
const { validateEditProfile } = require("../utils/validation.js");
const jwt = require("jsonwebtoken");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

    // console.log(cookies);
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR:- " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfile(req)) {
      throw new Error("Invalid profile details");
    }

    const loggedInUser = req.user;

    console.log(loggedInUser);
    console.log(req.body);

    Object.keys(req.body).every(
      (keys) => (loggedInUser[keys] = req.body[keys])
    );
    loggedInUser.save();
    res.send(loggedInUser);
  } catch (err) {
    res.status(400).send("ERROR:- " + err.message);
  }
});

profileRouter.patch("/profile/edit/password", userAuth, async (req, res) => {
  try {
    if (!validator.isStrongPassword(req.body.password)) {
      throw new Error("Not a strong password");
    }
    console.log(req.body);
    console.log(req.user);
    console.log(req.body.password);
    const passwordHash = await bcrypt.hash(req.body.password, 10);
    req.user.password = passwordHash;
    await req.user.save();
    res.send("Password updated")
  } catch (err) {
    res.status(400).send("ERROR:- " + err.message);
  }
});

module.exports = profileRouter;
