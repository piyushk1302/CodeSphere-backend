const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://piyushk1302:tdQoJPVrDjwbw0OE@learnmongodb.t749q.mongodb.net/tinderData"
  );
};

module.exports = connectDB;

