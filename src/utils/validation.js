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

module.exports={
    validateSignUpData,
}