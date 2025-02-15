const validator = require("validator");

const validateSignUpData =(req)=>{
const {firstName,lastName,emailId,password} = req.body;

    if(!firstName || !lastName){
        throw new Error("Please enter your name");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Enter correct email id");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Enter strong password");
    }
}
const validateEditProfile=async function (req){
    const ALLOWED_UPDATES = ["firstName","lastName","emailId","skills"];

    const isAllowed = Object.keys(req.body).every(k=>ALLOWED_UPDATES.includes(k));
    if(!isAllowed){
        throw new Error("cannot be updated,please check")
    }
    if(req.body?.skills?.length>10){
        throw new Error("You cannot list more than 10 skills right now ")
    }
    console.log("Updating the database...");
    
    return true;
}

module.exports={
    validateSignUpData,validateEditProfile
}