const express = require("express");
const userRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connection");
const User = require("../models/user");

userRouter.get("/user/requests/recieved", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", ["firstName", "lastName", "skills"]);

    res.json({
      message: "Connection requests fetched successfully",
      data: connectionRequest,
    });
  } catch (err) {
    res.status(400).send("ERROR:- " + err.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", ["firstName", "lastName", "skills"])
      .populate("toUserId", ["firstName", "lastName", "skills"]);

    const data = connectionRequest.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });

    res.json({
      message: data,
    });
  } catch (err) {
    res.status(400).send("ERROR:- " + err.message);
  }
});

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const page = req.query.page || 1;
    let limit = req.query.limit || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

    const connectionRequest = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    });

    const hiddenFromFeed = new Set();
    connectionRequest
      .forEach((req) => {
        hiddenFromFeed.add(req.fromUserId), hiddenFromFeed.add(req.toUserId);
      })
      // .select("fromUserId toUserId");

      const users = await User.find({
        $and: [
          { _id: { $nin: Array.from(hiddenFromFeed) } },
          { _id: { $ne: loggedInUser._id } },
        ],
      }).select("firstName lastName photoUrl").skip(skip).limit(limit)
      

    res.json({
      data: users,
    });
  } catch (err) {
    res.status(400).send("ERROR:- " + err.message);
  }
});

module.exports = userRouter;
