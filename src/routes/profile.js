const express = require("express");



const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth.js");
const { validateEditProfile } = require("../utils/validation.js");
const jwt= require("jsonwebtoken")

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
    
    Object.keys(req.body).every((keys) => (loggedInUser[keys] = req.body[keys]));
    loggedInUser.save();
    res.send(loggedInUser);
  } catch (err) {
    res.status(400).send("ERROR:- " + err.message);
  }
});


module.exports = profileRouter;
