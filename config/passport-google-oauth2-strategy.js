const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');


//telling passport to use new strategy for google login
passport.use(new googleStrategy({
        clientID: "812677332807-pk1s7fhjvr4tlok9tbtu309lvgj184pn.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:8000/users/auth/google/callback",
    },
    function(accessToken, refreshToken, profile, done){
        //find a user
        User.findOne({email: profile.emails[0].value}).exec(function(err, user){
            if(err){console.log("Error in google strategy passport", err); return;}

            console.log(profile);

            if(user){
                //if found, set this user as a req.user
                return done(null, user);
            } else {
                //if not found, create the user and set it as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err, user){
                    if(err){console.log("error in creating user", err); return;}

                    return done(null, user);
                });
            }
        });
    }

));


module.exports = passport;