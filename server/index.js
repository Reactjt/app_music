const express = require("express");
const mongoose = require("mongoose");
var JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require("passport");
const User = require("./models/User");
const authRoutes = require("./routes/auth");
const songRoutes = require("./routes/song");
require("dotenv").config();
const app = express();
const port = 8000;

app.use(express.json());


//connecting mongodb and nodeapp
mongoose
.connect(process.env.ATLAS_URI,
    {
        useUnifiedTopology: true,
    }
    )
    .then((x) => {
         console.log("connected to mongodb")
    })
    .catch((err) => {
        console.log("error while connecting to mongo")
    })

    //set-up passport-jwt
  
let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secretkey';
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        } 
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

//api get type
app.get("/",(req, res) => {
    res.send("hello world")
})

app.use("/auth", authRoutes);
app.use("/songs", songRoutes);

app.listen(port , () => {
    console.log("app running on port" + port);
})