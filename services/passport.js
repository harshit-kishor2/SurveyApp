const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");
const User = mongoose.model("users");

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({
        googleId: profile.id,
      }).then((existingUser) => {
        if (existingUser) {
          console.log("Already saved in database...");
          done(null, existingUser);
        } else {
          console.log("Data saved in database...");
          new User({
            googleId: profile.id,
          })
            .save()
            .then((user) => {
              done(null, user);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user.id);
  //here id taken from database id
});
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      console.log(err);
    });
});
