const express = require("express");

const requestRouter = express.Router();

const { userAuth } = require("../middlewares/auth.js");


requestRouter.post("/sendConnectionRequest", userAuth, (req, res) => {
    const user = req.user;
  
    // sending connection request
    console.log("Sending connection request");
  
    res.send(user.firstName + " sent the connection request");
  });

module.exports = requestRouter;