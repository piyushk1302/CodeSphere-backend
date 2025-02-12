const express = require("express");

const app = express();

const {adminAuth,userAuth} = require("./middlewares/auth")

//handle auth middleware for all http methods
app.use("/admin", adminAuth);

app.get("/admin/getData", (req, res) => {
  res.send("Data sent successfully");
});

app.get("/user",userAuth,(req,res)=>{
  res.send("user data sent")
})

// app.get("/ab?c", (req, res) =>{
//   res.send({
//     fname: "Piyush Kumar",
//     lname: "Singh",
//   });
// });

app.use("/user", [
  (req, res, next) => {
    console.log("Handling the router 1");
    // res.send("Router 1 handled successfully");
    next();
    res.send("Router 1 handled successfully");
  },
  (req, res, next) => {
    console.log("hello");

    //res.send("Router 2 handled success")
    next();
  },
  (req, res, next) => {
    console.log("hello 3");

    res.send("Router 3 handled success");
    next();
  },
]);

//ab*d-anything in place of *

app.get("/ab+c", (req, res) => {
  res.send({
    fname: "Piyush Kumar",
    lname: "Singh",
  });
});

// app.get("/user", (req, res) => {
//     console.log(req.query);
//     res.send({
//       fname: "Piyush",
//       lname: "Singh",
//     });
//   });

// app.get("/user/:userId", (req, res) => {
//     console.log(req.params);
//     res.send({
//       fname: "Piyush",
//       lname: "Singh",
//     });
//   });

// app.post("/user", (req, res) => {
//   // saving data to the database
//   res.send("data saved to db successfully");
// });

// app.put("/user", (req, res) => {
//   // update data in the database
//   res.send("data updated to db successfully");
// });

// app.patch("/user", (req, res) => {
//   // update data in the database
//   res.send("data patched to db successfully");
// });

// app.delete("/user", (req, res) => {
//   // deleting data from the database
//   res.send("data deleted from db successfully");
// });

// app.get("/test", (req, res) => {
//   res.send("Hello from server(test) side");
// });

// app.get("/hello", (req, res) => {
//   res.send("Hello hello hello hello");
// });

app.listen(7777, () => {
  console.log("Server created and is listening on port 7777...");
});
