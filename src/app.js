const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("Hello ,how r u????");
  });

app.get("/test", (req, res) => {
    res.send("Hello from server(test) side");
  });

app.get("/hello", (req, res) => {
  res.send("Hello hello hello hello");
});

app.listen(7777, () => {
  console.log("Server created and is listening on port 7777...");
});
