const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const {getToken} = require("../utils/helpers")

//1 post req will register a user
router.post("/register", async (req,res) => {
    const {email, password, firstName, lastName, userName} = req.body;

    //2 does email exits?
    const user = await User.findOne({email: email});
     if(user){
        
        return res
        .status(403)
        .json({error: "A user with this email already exists"});
     }
     //if no user find =>valid req

     //3 creating new user
     //do not store password in plain text  using salts
     const hashedPassword = bcrypt.hash(password, 10);  //10 no of rounds of salt increasing it will increase security but reduces time
     const newUserData = {email,
         password: hashedPassword,
          firstName,
           lastName,
            userName};
     const newUser = await User.create();

     //4 creating token to return to the user
     const token = await getToken(email, newUser);

     //5 return result to user
     const userToReturn = {...newUser.toJSON(), token};
     delete userToReturn.password;
     return res.status(200).json(userToReturn);

})

module.exports = router