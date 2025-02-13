const mongoose = require("mongoose");
const validator = require("validator")

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 50,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate(value){
        if(!validator.isEmail(value)){
            throw new Error("Not a valid email")
        }
    }
  },
  password: {
    type: String,
    required: true,
    validate(value){
        if(!validator.isStrongPassword(value)){
            throw new Error("Not a strong password")
        }
    }
  },
  age: {
    type: Number,
    min: 18,
  },
  gender: {
    type: String,
    validate(value){
        if(!["male","female"].includes(value)){
            throw new Error("Gender data is not valid,please check again")
        }
    }
  },
  skills: {
    type: [String]
  },
  photoUrl :{
    type: String,
    default: "fbdbvdvdbv/gig.com",
    validate(value){
        if(!validator.isURL(value)){
            throw new Error("Not a valid URL,please check")
        }
    }
  }
},{
    timestamps : true,
});

const User = mongoose.model("User", userSchema);
module.exports = User;
