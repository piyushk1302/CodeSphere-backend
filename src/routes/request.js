const express = require("express");

const requestRouter = express.Router();

const User = require("../models/user.js")
const ConnectionRequest = require("../models/connection.js");

const { userAuth } = require("../middlewares/auth.js");

requestRouter.post("/send/:status/:toUserId", userAuth, async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    const user =await  User.findById(toUserId);
    if(!user){
      throw new Error("User does not exist")
    }

    const ALLOWED_STATUS = ["interested", "ignored"];
    if (!ALLOWED_STATUS.includes(status)) {
      throw new Error(status + "not allowed");
    }

    const existingConnection =await  ConnectionRequest.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });
    if (existingConnection) {
      throw new Error("Connection already exists");
    };



    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });
    await connectionRequest.save();
    res.send("Success");
  } catch (err) {
    res.status(400).send("ERROR:- " + err.message);
  }
});



module.exports = requestRouter;
