const express = require("express");

const authRouter = express.Router();

const User = require("../models/user.js");
const { validateSignUpData } = require("../utils/validation.js");
const bcrypt = require("bcrypt");
const validator = require("validator");



authRouter.post("/signUp", async (req, res) => {
    console.log(req.body);
    try {
      //validate user data
      validateSignUpData(req);
      // const { firstName, emailId, password } = req.body;
  
      const { firstName, lastName, emailId, password } = req.body;
      //encrypt password
      const passwordHash = await bcrypt.hash(password, 10);
  
   
   
  
  
      const user = new User({
        firstName,
        lastName,
        emailId,
        password: passwordHash,
      });
  
      await user.save();
      res.send("User added successfully");
    } catch (err) {
      res.status(400).send("ERROR:" + err.message);
    }
  });

  authRouter.post("/login", async (req, res) => {
    try {
      const { emailId, password } = req.body;
      if (!validator.isEmail(emailId)) {
        throw new Error("Not a valid email,please check once");
      }
  
      const user = await User.findOne({ emailId: emailId });
  
      if (!user) {
        throw new Error("Invalid credentials");
      }
  
      const isPasswordValid = await user.validatePassword(password);
  
      if (isPasswordValid) {
        //create a token
        const token = await user.getJWT();
        console.log(token);
        if(token=== null){
            throw new Error("please log in first");
        }
  
        res.cookie("token", token, { expires: new Date(Date.now() + 60000000) });
        res.send(user);
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (err) {
      res.status(400).send("ERROR!!! :- " + err.message);
    }
  });

  authRouter.post("/logout",async(req,res)=>{
    res.cookie("token", null, { expires: new Date(Date.now()) });
    res.send("Logged out successfully");
  })

  module.exports = authRouter;