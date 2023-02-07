const express = require('express');
const jwt = require('jsonwebtoken');
const User = require("../models/userSchema")

const Authenticate = async(req ,res, next) =>{
    try{
        
        const token = req.cookies.jwtokens;
        console.log(token);
        const verifyToken = await jwt.verify(token,process.env.SECRET_KEY);
        console.log("v t");
        console.log(verifyToken);
        const rootuser = await User.findOne({_id:verifyToken._id},"tokens.token",token);
        console.log(rootuser);
        if(!rootuser){
            res.send("not a user")
        }
        req.token = token;
        console.log(token);
        req.rootuser = rootuser;
        req.userId = rootuser._id;
        console.log(rootuser);
        next()
    } catch (err) {
        res.send("not authorized")
        console.log(err);
    }
}


module.exports = Authenticate;