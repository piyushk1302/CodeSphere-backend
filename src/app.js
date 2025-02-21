const express = require("express");
const connectDB = require("./config/database");
// const validator = require("validator");
// already used in utils and middlewares
const app = express();
const cookiesParser = require("cookie-parser");
// const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(cookiesParser());

const authRouter = require("./routes/auth.js")
const profileRouter = require("./routes/profile.js")
const requestRouter = require("./routes/request.js")
const userRouter = require("./routes/user.js")

app.use("/",authRouter)
app.use("/",profileRouter)
app.use("/",requestRouter)
app.use("/",userRouter)

// if (learning_random_api) {
//   //first we will feed data for a single user
//   app.get("/user", async (req, res) => {
//     const userEmail = req.body.emailId;
//     try {
//       // const user = await User.findOne({ emailId: userEmail });
//       const user = await User.findOne({});
//       res.send(user);
//     } catch (err) {
//       res.status(400).send("error occured");
//     }
//   });

//   //feed api-get all the users from the databse
//   app.get("/feed", async (req, res) => {
//     try {
//       const users = await User.find({});
//       res.send(users);
//     } catch (err) {
//       res.status(500).send("error!!!");
//     }
//   });

//   app.delete("/user", async (req, res) => {
//     const userId = req.body.userId;
//     try {
//       const user = await User.findByIdAndDelete({ _id: userId });
//       // const user = await User.findByIdAndDelete(userId);
//       res.send("User deleted from database");
//     } catch (err) {
//       res.status(400).send("error!!!");
//     }
//   });

//   app.patch("/user/:userId", async (req, res) => {
//     const userId = req.params?.userId;
//     const data = req.body;
//     try {
//       console.log(userId);
//       console.log(data);

//       const ALLOWED_UPDATES = [
//         "lastName",
//         "age",
//         "skills",
//         "gender",
//         "photoUrl",
//       ];
//       const isAllowed = Object.keys(data).every((k) =>
//         ALLOWED_UPDATES.includes(k)
//       );

//       // if (!isAllowed) {
//       //   throw new Error("Update failed");
//       // }

//       if (!isAllowed) {
//         throw new Error("error occured");
//       }

//       if (data?.skills?.length() > 5) {
//         throw new Error("no skills will be added more");
//       }

//       console.log("Received userId:", userId);
//       console.log("recieved data", data);

//       // if (!_id || !mongoose.Types.ObjectId.isValid(_id)) {
//       //     return res.status(400).json({ error: "Invalid or missing user ID" });
//       //   }

//       const user = await User.findByIdAndUpdate(userId, data, {
//         new: true,
//         // returnDocument: "before",
//         runValidators: true,
//       });
//       console.log(user);

//       // const user = await User.findByIdAndDelete(userId);
//       res.send("User updated database");
//     } catch (err) {
//       console.log(err.message);

//       res.status(400).send("error!!!" + err.message);
//     }
//   });
// }

// const {adminAuth,userAuth} = require("./middlewares/auth")

// app.get("/getUserData",(req,res)=>{
//   try{
//     throw new Error("vfdhbnbj");
//   res.send("success")
//   }
//   catch{
//     res.status(500).send("error try again")
//   }
// })
// // always write it in the end
// app.use("/",(err,req,res,next)=>{
//   if(err){
//     req.status(500).send("Something went wrong")
//   }
// })

// //handle auth middleware for all http methods
// app.use("/admin", adminAuth);

// app.get("/admin/getData", (req, res) => {
//   res.send("Data sent successfully");
// });

// app.get("/user",userAuth,(req,res)=>{
//   res.send("user data sent")
// })

// // app.get("/ab?c", (req, res) =>{
// //   res.send({
// //     fname: "Piyush Kumar",
// //     lname: "Singh",
// //   });
// // });

// app.use("/user", [
//   (req, res, next) => {
//     console.log("Handling the router 1");
//     // res.send("Router 1 handled successfully");
//     next();
//     res.send("Router 1 handled successfully");
//   },
//   (req, res, next) => {
//     console.log("hello");

//     //res.send("Router 2 handled success")
//     next();
//   },
//   (req, res, next) => {
//     console.log("hello 3");

//     res.send("Router 3 handled success");
//     next();
//   },
// ]);

// //ab*d-anything in place of *

// app.get("/ab+c", (req, res) => {
//   res.send({
//     fname: "Piyush Kumar",
//     lname: "Singh",
//   });
// });

// // app.get("/user", (req, res) => {
// //     console.log(req.query);
// //     res.send({
// //       fname: "Piyush",
// //       lname: "Singh",
// //     });
// //   });

// // app.get("/user/:userId", (req, res) => {
// //     console.log(req.params);
// //     res.send({
// //       fname: "Piyush",
// //       lname: "Singh",
// //     });
// //   });

// // app.post("/user", (req, res) => {
// //   // saving data to the database
// //   res.send("data saved to db successfully");
// // });

// // app.put("/user", (req, res) => {
// //   // update data in the database
// //   res.send("data updated to db successfully");
// // });

// // app.patch("/user", (req, res) => {
// //   // update data in the database
// //   res.send("data patched to db successfully");
// // });

// // app.delete("/user", (req, res) => {
// //   // deleting data from the database
// //   res.send("data deleted from db successfully");
// // });

// // app.get("/test", (req, res) => {
// //   res.send("Hello from server(test) side");
// // });

// // app.get("/hello", (req, res) => {
// //   res.send("Hello hello hello hello");
// // });

connectDB()
  .then(() => {
    console.log("Database connection established");
    app.listen(7777, () => {
      console.log("server is listening on port 7777");
    });
  })
  .catch((err) => {
    console.error("error occured:", err);
  });
